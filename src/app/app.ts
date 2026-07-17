import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from './core/i18n/i18n.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';

/** Single-page shell: fixed header, storytelling sections, footer. */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, Hero, About, Experience, Projects, Skills, Contact, Footer],
  template: `
    <a class="skip-link" href="#about">{{ i18n.t('a11y.skip') }}</a>
    <app-header />
    <main>
      <app-hero />
      <app-about />
      <app-experience />
      <app-projects />
      <app-skills />
      <app-contact />
    </main>
    <app-footer />
  `,
})
export class App {
  protected readonly i18n = inject(I18nService);
}
