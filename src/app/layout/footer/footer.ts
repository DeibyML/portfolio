import { ChangeDetectionStrategy, Component, VERSION, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { PROFILE } from '../../data/profile';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="container">
      <div class="rule"></div>
      <div class="row mono">
        <span>© {{ year }} {{ profile.name }}</span>
        <span class="credit">{{ i18n.t('footer.credit') }} v{{ ngVersion }}</span>
        <a href="#top">{{ i18n.t('footer.top') }} ↑</a>
      </div>
    </footer>
  `,
  styles: `
    footer {
      padding-block: 2.5rem;
    }

    .rule {
      height: 1px;
      background: var(--ink-border);
      margin-bottom: 2rem;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-between;
      color: var(--cream-dim);
    }

    a {
      transition: color 0.25s;

      &:hover {
        color: var(--copper);
      }
    }
  `,
})
export class Footer {
  protected readonly i18n = inject(I18nService);
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
  /** Real framework version — keeps the credit line honest after upgrades. */
  protected readonly ngVersion = VERSION.major;
}
