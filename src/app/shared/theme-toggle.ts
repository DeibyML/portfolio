import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n/i18n.service';
import { ThemeService } from '../core/theme.service';

/** Sun/moon button: shows the theme it will switch to. */
@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" [attr.aria-label]="i18n.t('a11y.theme')" (click)="theme.toggle()">
      @if (theme.theme() === 'dark') {
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
          />
        </svg>
      } @else {
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      }
    </button>
  `,
  styles: `
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 50%;
      color: var(--cream-dim);
      transition:
        color 0.25s,
        background 0.25s,
        transform 0.3s var(--ease-out);

      &:hover {
        color: var(--copper);
        background: var(--copper-soft);
        transform: rotate(15deg);
      }
    }
  `,
})
export class ThemeToggle {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
}
