import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
} from '@angular/core';
import { MotionService, paletteRgb } from '../../core/motion.service';
import { ThemeService } from '../../core/theme.service';
import { SKILL_GROUPS } from '../../data/profile';

interface Node {
  label: string;
  /** Position on the unit sphere. */
  x: number;
  y: number;
  z: number;
  /** Cursor-repulsion offset in screen px, springs back to zero. */
  ox: number;
  oy: number;
  /** Projected screen position, kept for hit-testing. */
  sx: number;
  sy: number;
  depth: number;
}

/**
 * Interactive skills constellation: every technology becomes a node on a
 * slowly revolving sphere (canvas 2D with pseudo-3D projection). Nearby
 * nodes are joined by hairlines; on fine-pointer desktops, hovering lights
 * a node and its connections in copper and the cursor gently repels nodes.
 *
 * Decorative layer only — the skill cards below remain the accessible
 * source of truth. Static single frame under prefers-reduced-motion.
 */
@Component({
  selector: 'app-constellation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `<canvas #canvas></canvas>`,
  styles: `
    :host {
      display: block;
      height: clamp(280px, 40vh, 400px);
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
})
export class Constellation {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly dpr = Math.min(devicePixelRatio || 1, 1.5);
  private readonly nodes = this.seedNodes();
  private readonly links = this.seedLinks();
  private colors = { copper: '217, 138, 87', cream: '237, 230, 218' };
  private rotation = 0;
  private pointer = { x: -1e4, y: -1e4 };
  private hovered = -1;
  private stopTicker?: () => void;

  constructor() {
    const canvas = () => this.host.nativeElement.querySelector('canvas')!;

    effect(() => {
      this.theme.theme();
      this.colors = { copper: paletteRgb('copper'), cream: paletteRgb('cream') };
      if (this.motion.reducedMotion) {
        this.draw(canvas());
      }
    });

    const resize = new ResizeObserver(() => {
      const el = canvas();
      el.width = el.clientWidth * this.dpr;
      el.height = el.clientHeight * this.dpr;
      this.draw(el);
    });

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.motion.reducedMotion && !this.stopTicker) {
        this.stopTicker = this.motion.onFrame(() => {
          this.rotation += 0.0022;
          this.draw(canvas());
        });
      } else if (!entry.isIntersecting) {
        this.stopTicker?.();
        this.stopTicker = undefined;
      }
    });

    const onMove = (event: MouseEvent) => {
      const rect = canvas().getBoundingClientRect();
      this.pointer = {
        x: (event.clientX - rect.left) * this.dpr,
        y: (event.clientY - rect.top) * this.dpr,
      };
    };
    const onLeave = () => {
      this.pointer = { x: -1e4, y: -1e4 };
    };

    queueMicrotask(() => {
      resize.observe(this.host.nativeElement);
      io.observe(this.host.nativeElement);
      if (this.motion.interactive) {
        this.host.nativeElement.addEventListener('mousemove', onMove, { passive: true });
        this.host.nativeElement.addEventListener('mouseleave', onLeave, { passive: true });
        this.host.nativeElement.style.pointerEvents = 'auto';
      }
    });

    this.destroyRef.onDestroy(() => {
      resize.disconnect();
      io.disconnect();
      this.stopTicker?.();
      this.host.nativeElement.removeEventListener('mousemove', onMove);
      this.host.nativeElement.removeEventListener('mouseleave', onLeave);
    });
  }

  /** Every skill name, spread evenly on a sphere (Fibonacci lattice). */
  private seedNodes(): Node[] {
    const labels = SKILL_GROUPS.flatMap((group) => group.skills.map((skill) => skill.name));
    const golden = Math.PI * (3 - Math.sqrt(5));
    return labels.map((label, i) => {
      const y = 1 - (i / (labels.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = golden * i;
      return {
        label,
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        ox: 0,
        oy: 0,
        sx: 0,
        sy: 0,
        depth: 0,
      };
    });
  }

  /** Pairs close enough on the sphere to be joined by a hairline. */
  private seedLinks(): [number, number][] {
    const links: [number, number][] = [];
    for (let a = 0; a < this.nodes.length; a++) {
      for (let b = a + 1; b < this.nodes.length; b++) {
        const dx = this.nodes[a].x - this.nodes[b].x;
        const dy = this.nodes[a].y - this.nodes[b].y;
        const dz = this.nodes[a].z - this.nodes[b].z;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.72) {
          links.push([a, b]);
        }
      }
    }
    return links;
  }

  private draw(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width === 0) {
      return;
    }
    const { width, height } = canvas;
    const radius = Math.min(width, height) * 0.36;
    const cx = width / 2;
    const cy = height / 2;
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);

    ctx.clearRect(0, 0, width, height);

    // Project each node and let the cursor push it away a little.
    this.hovered = -1;
    let hoverDistance = 42 * this.dpr;
    this.nodes.forEach((node, i) => {
      const rx = node.x * cos - node.z * sin;
      const rz = node.x * sin + node.z * cos;
      const scale = 1.6 / (1.6 + rz * 0.8);
      const px = cx + rx * radius * scale;
      const py = cy + node.y * radius * 0.86 * scale;

      const dx = px - this.pointer.x;
      const dy = py - this.pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const push = 90 * this.dpr;
      if (dist < push && dist > 0.001) {
        const force = ((push - dist) / push) * 14 * this.dpr;
        node.ox += ((dx / dist) * force - node.ox) * 0.12;
        node.oy += ((dy / dist) * force - node.oy) * 0.12;
      } else {
        node.ox *= 0.9;
        node.oy *= 0.9;
      }

      node.sx = px + node.ox;
      node.sy = py + node.oy;
      node.depth = scale;
      if (dist < hoverDistance) {
        hoverDistance = dist;
        this.hovered = i;
      }
    });

    // Hairline connections first, so nodes and labels sit on top.
    for (const [a, b] of this.links) {
      const na = this.nodes[a];
      const nb = this.nodes[b];
      const active = this.hovered === a || this.hovered === b;
      const alpha = active ? 0.55 : 0.1 * ((na.depth + nb.depth) / 2);
      ctx.strokeStyle = `rgba(${active ? this.colors.copper : this.colors.cream}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(na.sx, na.sy);
      ctx.lineTo(nb.sx, nb.sy);
      ctx.stroke();
    }

    ctx.font = `${10.5 * this.dpr}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    this.nodes.forEach((node, i) => {
      const active = i === this.hovered;
      const dotAlpha = active ? 1 : 0.35 + node.depth * 0.3;
      ctx.beginPath();
      ctx.arc(node.sx, node.sy, (active ? 3.4 : 2.2) * this.dpr * node.depth, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colors.copper}, ${dotAlpha})`;
      ctx.fill();

      const labelAlpha = active ? 0.95 : 0.28 + node.depth * 0.25;
      ctx.fillStyle = `rgba(${active ? this.colors.copper : this.colors.cream}, ${labelAlpha})`;
      ctx.fillText(node.label, node.sx, node.sy - 8 * this.dpr * node.depth);
    });
  }
}
