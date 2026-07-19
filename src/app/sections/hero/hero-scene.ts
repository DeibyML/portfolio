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
import type * as THREE from 'three';

/**
 * The hero's protagonist 3D piece: a copper wireframe icosahedron orbited by
 * a faint cream torus, drawn in hairline strokes only (no fills, no shadows,
 * no new colors), per the planning spec.
 *
 * Behaviour: slow continuous rotation, soft mouse parallax on fine-pointer
 * desktops, and rotation advance tied to scroll. three.js is dynamically
 * imported only when WebGL is available, so it never weighs on the initial
 * bundle. Rendering pauses while the hero is off screen; capped at DPR 1.5.
 * Under prefers-reduced-motion a single static frame is rendered.
 */
@Component({
  selector: 'app-hero-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: ``,
  styles: `
    :host {
      display: block;
      position: absolute;
      pointer-events: none;
    }

    :host canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class HeroScene {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  private materials: { copper?: THREE.LineBasicMaterial; cream?: THREE.LineBasicMaterial } = {};
  private renderOnce?: () => void;

  constructor() {
    // Re-tint the wireframes when the palette flips with the theme.
    effect(() => {
      this.theme.theme();
      this.materials.copper?.color.set(`rgb(${paletteRgb('copper')})`);
      this.materials.cream?.color.set(`rgb(${paletteRgb('cream')})`);
      this.renderOnce?.();
    });

    queueMicrotask(() => void this.init());
  }

  private async init(): Promise<void> {
    if (!this.supportsWebGl()) {
      return; // Graceful skip: the hero works fine without the piece.
    }

    const three = await import('three');
    const el = this.host.nativeElement;

    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.z = 6;

    const renderer = new three.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    el.appendChild(renderer.domElement);

    const copper = new three.LineBasicMaterial({
      color: `rgb(${paletteRgb('copper')})`,
      transparent: true,
      opacity: 0.75,
    });
    const cream = new three.LineBasicMaterial({
      color: `rgb(${paletteRgb('cream')})`,
      transparent: true,
      opacity: 0.16,
    });
    this.materials = { copper, cream };

    const group = new three.Group();
    const icosahedron = new three.LineSegments(
      new three.EdgesGeometry(new three.IcosahedronGeometry(1.5, 1)),
      copper,
    );
    const torus = new three.LineSegments(
      new three.EdgesGeometry(new three.TorusGeometry(2.4, 0.45, 6, 36)),
      cream,
    );
    torus.rotation.x = Math.PI / 2.6;
    group.add(icosahedron, torus);
    scene.add(group);

    const render = () => renderer.render(scene, camera);
    this.renderOnce = render;

    const resize = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = el;
      if (clientWidth === 0) {
        return;
      }
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      render();
    });
    resize.observe(el);

    if (this.motion.reducedMotion) {
      // Static piece: one frame, no loop, no listeners.
      this.destroyRef.onDestroy(() => {
        resize.disconnect();
        renderer.dispose();
      });
      return;
    }

    // Soft mouse parallax, desktop fine-pointer only.
    const pointer = { x: 0, y: 0 };
    const onMouse = (event: MouseEvent) => {
      pointer.x = (event.clientX / innerWidth) * 2 - 1;
      pointer.y = (event.clientY / innerHeight) * 2 - 1;
    };
    if (this.motion.interactive) {
      addEventListener('mousemove', onMouse, { passive: true });
    }

    // Animate only while the hero is on screen.
    let stopTicker: (() => void) | undefined;
    let last = 0;
    const tick = (time: number) => {
      const delta = last ? Math.min(time - last, 50) : 16;
      last = time;
      group.rotation.y += delta * 0.00012;
      icosahedron.rotation.y += delta * 0.00008;
      torus.rotation.z -= delta * 0.00005;
      // Scroll advances the piece; the pointer nudges it.
      const targetX = pointer.y * 0.22 + scrollY * 0.0006;
      const targetY = pointer.x * 0.3;
      group.rotation.x += (targetX - group.rotation.x) * 0.05;
      group.rotation.z += (targetY * 0.4 - group.rotation.z) * 0.05;
      render();
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !stopTicker) {
        last = 0;
        stopTicker = this.motion.onFrame(tick);
      } else if (!entry.isIntersecting) {
        stopTicker?.();
        stopTicker = undefined;
      }
    });
    io.observe(el);

    this.destroyRef.onDestroy(() => {
      stopTicker?.();
      io.disconnect();
      resize.disconnect();
      removeEventListener('mousemove', onMouse);
      renderer.dispose();
    });
  }

  private supportsWebGl(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      return false;
    }
  }
}
