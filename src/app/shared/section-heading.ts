import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18nService } from '../core/i18n/i18n.service';
import { TranslationKey } from '../core/i18n/translations';
import { RevealDirective } from './reveal.directive';

/**
 * Chapter-style section opener: index number, uppercase label, trailing rule.
 * One component instead of five copies of the same markup.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <div class="section-head" appReveal>
      <span class="index">{{ index() }}</span>
      <span class="label">{{ i18n.t(labelKey()) }}</span>
      <span class="rule"></span>
    </div>
  `,
})
export class SectionHeading {
  protected readonly i18n = inject(I18nService);

  readonly index = input.required<string>();
  readonly labelKey = input.required<TranslationKey>();
}
