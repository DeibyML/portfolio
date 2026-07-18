import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Five-dot proficiency meter shared by the skills matrix and the language
 * facts. Purely decorative — pair it with visible text for screen readers.
 */
@Component({
  selector: 'app-dot-meter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @for (on of dots(); track $index) {
      <span class="dot" [class.on]="on"></span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      gap: 4px;
      align-items: center;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--ink-border);

      &.on {
        background: var(--copper);
      }
    }
  `,
})
export class DotMeter {
  /** Filled dots, clamped to 0–5. */
  readonly level = input.required<number>();

  protected readonly dots = computed(() =>
    Array.from({ length: 5 }, (_, i) => i < Math.min(5, Math.max(0, this.level()))),
  );
}
