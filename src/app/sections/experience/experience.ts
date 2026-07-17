import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { EXPERIENCE } from '../../data/profile';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly i18n = inject(I18nService);
  protected readonly entries = EXPERIENCE;

  /** "2023 — Now", "2020", "2017 — 2019" */
  protected period(start: number, end: number | null): string {
    if (end === null) {
      return `${start} — ${this.i18n.t('exp.now')}`;
    }
    return end === start ? `${start}` : `${start} — ${end}`;
  }
}
