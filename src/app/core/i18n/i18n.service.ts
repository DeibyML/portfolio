import { Injectable, effect, signal } from '@angular/core';
import { LANGS, Lang, TRANSLATIONS, TranslationKey } from './translations';

const STORAGE_KEY = 'portfolio.lang';

/** English is the product default; stored preference wins on return visits. */
function initialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  return LANGS.includes(stored as Lang) ? (stored as Lang) : 'en';
}

/**
 * Signal-based runtime i18n.
 *
 * Templates call `i18n.t(key)` directly: the signal read inside makes every
 * binding reactive to language changes under zoneless change detection,
 * with no pipe or library needed.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(initialLang());
  readonly languages = LANGS;

  constructor() {
    // Keep the document language and stored preference in sync with the signal.
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
    });
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[this.lang()][key];
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }
}
