import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslationKey } from '../../core/i18n/translations';
import { LangSwitcher } from '../../shared/lang-switcher';
import { ThemeToggle } from '../../shared/theme-toggle';

interface NavItem {
  key: TranslationKey;
  href: string;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LangSwitcher, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:keydown)': 'onKeydown($event)',
    '(window:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly i18n = inject(I18nService);

  /** Solidifies the header background once the hero starts scrolling away. */
  protected readonly scrolled = signal(false);
  /** Page scroll progress in [0, 1], drives the thin bar under the header. */
  protected readonly progress = signal(0);
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
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(scrollable > 0 ? window.scrollY / scrollable : 0);
  }

  /** Keyboard shortcuts: 1-5 jump to the matching numbered section. */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
    ) {
      return;
    }
    const item = /^[1-5]$/.test(event.key) ? this.nav[Number(event.key) - 1] : undefined;
    if (item) {
      this.closeMenu();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelector(item.href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }
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
