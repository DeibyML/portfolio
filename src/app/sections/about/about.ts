import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslationKey } from '../../core/i18n/translations';
import { EDUCATION, EXPERIENCE, PROFILE } from '../../data/profile';
import { DotMeter } from '../../shared/dot-meter';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';

interface LanguageFact {
  nameKey: TranslationKey;
  levelKey: TranslationKey;
  /** Spoken-fluency meter, 1–5. */
  level: number;
}

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionHeading, DotMeter],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly i18n = inject(I18nService);
  protected readonly education = EDUCATION;

  protected readonly languages: LanguageFact[] = [
    { nameKey: 'about.langEs', levelKey: 'about.levelEs', level: 5 },
    { nameKey: 'about.langEn', levelKey: 'about.levelEn', level: 4 },
    { nameKey: 'about.langFr', levelKey: 'about.levelFr', level: 4 },
  ];

  /** Headline numbers, derived from the data rather than hardcoded. */
  protected readonly stats: { value: string; labelKey: TranslationKey }[] = [
    { value: `${new Date().getFullYear() - PROFILE.careerStart}+`, labelKey: 'stats.years' },
    { value: `${EXPERIENCE.length}`, labelKey: 'stats.companies' },
    { value: '2', labelKey: 'stats.countries' },
    { value: `${this.languages.length}`, labelKey: 'stats.languages' },
  ];
}
