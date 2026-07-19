import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { MARQUEE, PROFILE } from '../../data/profile';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { Particles } from '../../shared/particles';
import { HeroScene } from './hero-scene';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroScene, Particles, MagneticDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly i18n = inject(I18nService);
  protected readonly profile = PROFILE;
  protected readonly marquee = MARQUEE;
}
