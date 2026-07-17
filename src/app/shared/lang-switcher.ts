import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n/i18n.service';

/** EN / FR / ES toggle; reused in the header and the mobile menu. */
@Component({
  selector: 'app-lang-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lang" role="group" [attr.aria-label]="i18n.t('a11y.langSwitcher')">
      @for (lang of i18n.languages; track lang) {
        <button
          type="button"
          class="mono"
          [class.active]="i18n.lang() === lang"
          [attr.aria-pressed]="i18n.lang() === lang"
          (click)="i18n.setLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      }
    </div>
  `,
  styles: `
    .lang {
      display: flex;
      gap: 0.25rem;
    }

    button {
      padding: 0.35rem 0.55rem;
      border-radius: 4px;
      color: var(--cream-dim);
      transition:
        color 0.25s,
        background 0.25s;

      &:hover {
        color: var(--cream);
      }

      &.active {
        color: var(--copper);
        background: var(--copper-soft);
      }
    }
  `,
})
export class LangSwitcher {
  protected readonly i18n = inject(I18nService);
}
