import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslationKey } from '../../core/i18n/translations';
import { LangSwitcher } from '../../shared/lang-switcher';

interface NavItem {
  key: TranslationKey;
  href: string;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LangSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly i18n = inject(I18nService);

  /** Solidifies the header background once the hero starts scrolling away. */
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly nav: NavItem[] = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.contact', href: '#contact' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }
}
