import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

/**
 * Single-page site: no router needed — navigation is pure in-page anchors,
 * which keeps the bundle lean and scrolling native.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
