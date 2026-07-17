import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { SKILL_GROUPS } from '../../data/profile';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly i18n = inject(I18nService);
  protected readonly groups = SKILL_GROUPS;
}
