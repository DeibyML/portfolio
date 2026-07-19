import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
} from '@angular/core';
import { MotionService, paletteRgb } from '../core/motion.service';
import { ThemeService } from '../core/theme.service';

interface Particle {
  x: number; // 0..1 of canvas width
  y: number; // 0..1 of canvas height
  z: number; // depth layer: 1 = front
  vx: number;
  vy: number;
}

/**
 * Sparse copper particle field with three depth layers (canvas 2D, no WebGL).
 * Layers drift slowly and parallax against scroll at different rates.
 * Decorative only: hidden from the accessibility tree, pointer-events none.
 *
 * Per the planning spec: <= 90 points desktop / 40 mobile, max alpha 0.35,
 * one shared rAF (MotionService), and a single static frame under
 * prefers-reduced-motion.
 */
@Component({
  selector: 'app-particles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `<canvas #canvas></canvas>`,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: block;
      overflow: hidden;
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
})
export class Particles {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly dpr = Math.min(devicePixelRatio || 1, 1.5);
  private particles: Particle[] = [];
  private copper = '217, 138, 87';
  private visible = false;
  private stopTicker?: () => void;

  constructor() {
    const canvas = () => this.host.nativeElement.querySelector('canvas')!;

    // Redraw with the right copper whenever the theme flips.
    effect(() => {
      this.theme.theme();
      this.copper = paletteRgb('copper');
      if (this.motion.reducedMotion) {
        this.draw(canvas());
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      const el = canvas();
      el.width = el.clientWidth * this.dpr;
      el.height = el.clientHeight * this.dpr;
      this.seed();
      this.draw(el);
    });

    // Animate only while on screen; a static frame is enough under reduced motion.
    const io = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible && !this.motion.reducedMotion && !this.stopTicker) {
        this.stopTicker = this.motion.onFrame(() => this.tick(canvas()));
      } else if (!this.visible) {
        this.stopTicker?.();
        this.stopTicker = undefined;
      }
    });

    queueMicrotask(() => {
      resizeObserver.observe(this.host.nativeElement);
      io.observe(this.host.nativeElement);
    });

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
      io.disconnect();
      this.stopTicker?.();
    });
  }

  private seed(): void {
    const count = window.innerWidth < 820 ? 40 : 90;
    if (this.particles.length === count) {
      return;
    }
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: [0.35, 0.65, 1][Math.floor(Math.random() * 3)],
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00008,
    }));
  }

  private tick(canvas: HTMLCanvasElement): void {
    for (const p of this.particles) {
      p.x = (p.x + p.vx * p.z + 1) % 1;
      p.y = (p.y + p.vy * p.z + 1) % 1;
    }
    this.draw(canvas);
  }

  private draw(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width === 0) {
      return;
    }
    const { width, height } = canvas;
    // Deeper layers parallax more slowly against page scroll.
    const scroll = scrollY * this.dpr;
    ctx.clearRect(0, 0, width, height);
    for (const p of this.particles) {
      const y = (((p.y * height - scroll * (1 - p.z) * 0.12) % height) + height) % height;
      ctx.beginPath();
      ctx.arc(p.x * width, y, p.z * 1.6 * this.dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.copper}, ${0.35 * p.z})`;
      ctx.fill();
    }
  }
}
