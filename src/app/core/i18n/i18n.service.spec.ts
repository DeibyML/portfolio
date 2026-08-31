import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService URL language', () => {
  let base: HTMLBaseElement;

  beforeEach(() => {
    base =
      document.querySelector('base') ?? document.head.appendChild(document.createElement('base'));
    base.href = '/portfolio/';
    localStorage.clear();
    history.replaceState(null, '', '/portfolio/');
  });

  afterEach(() => {
    history.replaceState(null, '', '/');
  });

  it('uses a valid URL language instead of the saved preference', () => {
    localStorage.setItem('portfolio.lang', 'es');
    history.replaceState(null, '', '/portfolio/fr');

    expect(TestBed.inject(I18nService).lang()).toBe('fr');
  });

  it('uses English at the base URL and updates the path when switching', () => {
    localStorage.setItem('portfolio.lang', 'fr');
    const service = TestBed.inject(I18nService);

    expect(service.lang()).toBe('en');

    service.setLang('es');
    expect(location.pathname).toBe('/portfolio/es');

    service.setLang('en');
    expect(location.pathname).toBe('/portfolio/');
  });
});
