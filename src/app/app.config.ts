import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

/**
 * Zoneless by design: change detection is driven purely by signals,
 * so zone.js never ships. No router either; navigation is in-page
 * anchors, which keeps the bundle lean and scrolling native.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideBrowserGlobalErrorListeners()],
};
