import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { MotionService } from '../core/motion.service';

/**
 * Magnetic pull for buttons: the element leans up to 6px toward the cursor
 * and springs back elastically on leave. Fine-pointer desktops only; inert
 * everywhere else (including under prefers-reduced-motion).
 *
 * Listeners are attached natively so mousemove never touches change detection.
 */
@Directive({ selector: '[appMagnetic]' })
export class MagneticDirective {
  private static readonly PULL = 6;

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    if (!motion.interactive) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const max = Math.max(rect.width, rect.height);
      el.style.transition = 'transform 0.1s linear';
      el.style.transform = `translate(${(dx / max) * MagneticDirective.PULL * 2}px, ${(dy / max) * MagneticDirective.PULL * 2}px)`;
    };
    const onLeave = () => {
      // Elastic return: a touch of overshoot on the way back.
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.8, 0.5, 1)';
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
