import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio.theme';
/** Matches the --ink page background of each theme, for the browser chrome. */
const THEME_COLOR: Record<Theme, string> = { dark: '#0e0c09', light: '#f6f1e9' };

/** Dark is the brand default; a stored preference wins on return visits. */
function initialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

/**
 * Dark/light theme as a signal. The template attribute it controls,
 * `data-theme` on <html>, swaps the three palette RGB triplets in
 * styles.scss; every other color derives from them.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(initialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.dataset['theme'] = theme;
      localStorage.setItem(STORAGE_KEY, theme);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[theme]);
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
