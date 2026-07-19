import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { SKILL_GROUPS } from '../../data/profile';
import { DotMeter } from '../../shared/dot-meter';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';
import { Constellation } from './constellation';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionHeading, DotMeter, Constellation],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly i18n = inject(I18nService);
  protected readonly groups = SKILL_GROUPS;
}
