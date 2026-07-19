import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { MotionService } from '../core/motion.service';

/**
 * Custom cursor: an 8px copper dot that tracks the pointer directly, and a
 * ring that follows with a soft lag and grows over interactive elements.
 * Activates only on fine-pointer desktops without reduced motion; there the
 * native cursor is hidden via the `has-cursor` class on <html>.
 *
 * Everything runs on native listeners plus the shared rAF loop — no signals,
 * no change detection involvement.
 */
@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="dot"></div>
    <div class="ring"></div>
  `,
  styles: `
    :host {
      display: contents;
    }

    .dot,
    .ring {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      pointer-events: none;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .dot {
      width: 8px;
      height: 8px;
      margin: -4px 0 0 -4px;
      background: var(--copper);
    }

    .ring {
      width: 34px;
      height: 34px;
      margin: -17px 0 0 -17px;
      border: 1px solid rgba(var(--copper-rgb), 0.55);
      transition:
        opacity 0.3s,
        width 0.25s var(--ease-out),
        height 0.25s var(--ease-out),
        margin 0.25s var(--ease-out);
    }

    :host(.over) .ring {
      width: 52px;
      height: 52px;
      margin: -26px 0 0 -26px;
      background: var(--copper-soft);
      border-color: var(--copper);
    }
  `,
})
export class Cursor {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    if (!motion.interactive) {
      return;
    }

    document.documentElement.classList.add('has-cursor');
    const dot = host.querySelector<HTMLElement>('.dot')!;
    const ring = host.querySelector<HTMLElement>('.ring')!;

    const target = { x: -100, y: -100 };
    const lagged = { x: -100, y: -100 };
    let seen = false;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!seen) {
        seen = true;
        lagged.x = target.x;
        lagged.y = target.y;
        dot.style.opacity = ring.style.opacity = '1';
      }
    };
    const onOver = (event: MouseEvent) => {
      const interactive = (event.target as Element | null)?.closest('a, button, [role="button"]');
      host.classList.toggle('over', !!interactive);
    };
    const onLeave = () => {
      dot.style.opacity = ring.style.opacity = '0';
      seen = false;
    };

    const stop = motion.onFrame(() => {
      lagged.x += (target.x - lagged.x) * 0.16;
      lagged.y += (target.y - lagged.y) * 0.16;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${lagged.x}px, ${lagged.y}px, 0)`;
    });

    addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave, { passive: true });

    destroyRef.onDestroy(() => {
      stop();
      document.documentElement.classList.remove('has-cursor');
      removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    });
  }
}
