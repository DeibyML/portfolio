import { Injectable, effect, signal } from '@angular/core';
import { LANGS, Lang, TRANSLATIONS, TranslationKey } from './translations';

const STORAGE_KEY = 'portfolio.lang';

function siteBasePath(): string {
  const href = document.querySelector('base')?.getAttribute('href') ?? '/';
  return new URL(href, location.href).pathname.replace(/\/?$/, '/');
}

function languageFromUrl(): Lang | undefined {
  const path = location.pathname.replace(/\/?$/, '/');
  const base = siteBasePath();
  const segment = path.startsWith(base) ? path.slice(base.length).replace(/^\/+|\/+$/g, '') : '';
  return segment === 'fr' || segment === 'es' ? segment : undefined;
}

/** A valid URL language wins; the base URL is always English. */
function initialLang(): Lang {
  return languageFromUrl() ?? 'en';
}

function updateLanguageUrl(lang: Lang): void {
  const url = new URL(location.href);
  const base = siteBasePath();
  url.pathname = lang === 'en' ? base : `${base}${lang}`;
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
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
    updateLanguageUrl(lang);
  }
}
