import { DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../core/motion.service';

/**
 * Count-up for the stat band: "9+" animates 0 → 9 over 1.2s with a
 * decelerating ease the first time it scrolls into view, keeping any
 * non-numeric suffix. Renders the final value immediately under
 * prefers-reduced-motion or when there is nothing numeric to animate.
 */
@Directive({ selector: '[appCountup]' })
export class CountupDirective {
  /** Final display value, e.g. "9+", "7", "2". */
  readonly appCountup = input.required<string>();

  private static readonly DURATION_MS = 1200;

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    queueMicrotask(() => {
      const value = this.appCountup();
      const match = /^(\d+)(.*)$/.exec(value);
      if (!match || motion.reducedMotion) {
        el.textContent = value;
        return;
      }
      const target = Number(match[1]);
      const suffix = match[2];
      el.textContent = `0${suffix}`;

      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        io.disconnect();
        let start = 0;
        const stop = motion.onFrame((time) => {
          start ||= time;
          const progress = Math.min((time - start) / CountupDirective.DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress === 1) {
            stop();
          }
        });
        destroyRef.onDestroy(stop);
      });
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
