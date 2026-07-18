import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n/i18n.service';

/**
 * EN / FR / ES toggle; reused in the header and the mobile menu.
 * Each button carries a tiny color-only flag chip (pure CSS gradients,
 * decorative — the text label is what screen readers announce).
 */
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
          <span class="flag" [class]="'flag-' + lang" aria-hidden="true"></span>
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
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.55rem;
      border-radius: 4px;
      color: var(--cream-dim);
      transition:
        color 0.25s,
        background 0.25s,
        opacity 0.25s;

      &:hover {
        color: var(--cream);

        .flag {
          opacity: 1;
        }
      }

      &.active {
        color: var(--copper);
        background: var(--copper-soft);

        .flag {
          opacity: 1;
        }
      }
    }

    /* Color-only mini flags: stripes, no emblems */
    .flag {
      width: 14px;
      height: 10px;
      border-radius: 2px;
      opacity: 0.55;
      box-shadow: inset 0 0 0 1px rgba(var(--ink-rgb), 0.35);
      transition: opacity 0.25s;
    }

    /* United Kingdom: red cross with white fimbriation on blue */
    .flag-en {
      background:
        linear-gradient(90deg, transparent 43%, var(--flag-red) 43% 57%, transparent 57%),
        linear-gradient(180deg, transparent 36%, var(--flag-red) 36% 64%, transparent 64%),
        linear-gradient(90deg, transparent 33%, var(--flag-white) 33% 67%, transparent 67%),
        linear-gradient(180deg, transparent 24%, var(--flag-white) 24% 76%, transparent 76%),
        var(--flag-blue);
    }

    /* France: vertical tricolore */
    .flag-fr {
      background: linear-gradient(
        90deg,
        var(--flag-blue) 33.3%,
        var(--flag-white) 33.3% 66.6%,
        var(--flag-red) 66.6%
      );
    }

    /* Spain: red-yellow-red */
    .flag-es {
      background: linear-gradient(
        180deg,
        var(--flag-red) 25%,
        var(--flag-yellow) 25% 75%,
        var(--flag-red) 75%
      );
    }
  `,
})
export class LangSwitcher {
  protected readonly i18n = inject(I18nService);
}
