import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { MotionService } from '../core/motion.service';

/**
 * Depth tilt for cards (pure CSS 3D, per the planning spec): perspective
 * 1000px, max ±4° toward the cursor, plus `--glow-x/--glow-y` custom
 * properties so the card's stylesheet can paint a copper glow that follows
 * the pointer. Fine-pointer desktops only.
 */
@Directive({ selector: '[appTilt]' })
export class TiltDirective {
  private static readonly MAX_DEG = 4;

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    if (!motion.interactive) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * TiltDirective.MAX_DEG * 2;
      const ry = (px - 0.5) * TiltDirective.MAX_DEG * 2;
      el.style.transition = 'transform 0.1s linear';
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      el.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`);
    };
    const onLeave = () => {
      el.style.transition = 'transform 0.6s var(--ease-out)';
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
    destroyRef.onDestroy(() => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    });
  }
}
