import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Reveals an element with the `.reveal` CSS transition the first time it
 * enters the viewport. Usage: `<div appReveal>` or `<div [appReveal]="150">`
 * for a stagger delay in milliseconds.
 *
 * Falls back to immediately-visible when IntersectionObserver is unavailable;
 * `prefers-reduced-motion` is handled in CSS.
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Stagger delay in ms, applied via the `--reveal-delay` custom property. */
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;

    if (this.delay() > 0) {
      node.style.setProperty('--reveal-delay', `${this.delay()}ms`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
