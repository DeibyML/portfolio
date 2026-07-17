import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { I18nService } from './core/i18n/i18n.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    localStorage.clear();
  });

  it('renders the hero with the default (English) language', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Deiby');
    expect(el.textContent).toContain('Senior Fullstack Software Engineer');
  });

  it('re-renders every section when the language changes', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    TestBed.inject(I18nService).setLang('es');
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Ingeniero de software fullstack senior');
    expect(document.documentElement.lang).toBe('es');
  });
});
