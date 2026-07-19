import { Injectable } from '@angular/core';

/**
 * Central switchboard for the motion layer.
 *
 * - Capability checks: `interactive` gates cursor-driven effects (custom
 *   cursor, magnetism, tilt, 3D parallax) to fine-pointer desktops without
 *   reduced motion, per the planning spec.
 * - A single shared requestAnimationFrame loop drives every animated piece
 *   (cursor, particles, constellation, hero scene) so the page schedules at
 *   most one frame callback, and none while nothing is animating.
 *
 * Tickers mutate the DOM/canvas directly and never touch signals, so the
 * loop runs outside Angular change detection entirely.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly finePointerQuery = matchMedia('(pointer: fine)');

  private readonly tickers = new Set<(time: number) => void>();
  private frameId = 0;

  get reducedMotion(): boolean {
    return this.reducedQuery.matches;
  }

  /** Fine pointer, desktop-sized viewport, and no reduced-motion request. */
  get interactive(): boolean {
    return this.finePointerQuery.matches && window.innerWidth >= 820 && !this.reducedMotion;
  }

  /** Register a per-frame callback; returns its disposer. */
  onFrame(ticker: (time: number) => void): () => void {
    this.tickers.add(ticker);
    if (this.tickers.size === 1) {
      this.frameId = requestAnimationFrame(this.loop);
    }
    return () => {
      this.tickers.delete(ticker);
      if (this.tickers.size === 0) {
        cancelAnimationFrame(this.frameId);
      }
    };
  }

  private readonly loop = (time: number): void => {
    for (const ticker of this.tickers) {
      ticker(time);
    }
    if (this.tickers.size > 0) {
      this.frameId = requestAnimationFrame(this.loop);
    }
  };
}

/** Read a `--*-rgb` palette triplet as "r, g, b" for canvas/WebGL use. */
export function paletteRgb(token: 'ink' | 'cream' | 'copper'): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${token}-rgb`)
    .replace(/\s+/g, ' ')
    .trim();
}
