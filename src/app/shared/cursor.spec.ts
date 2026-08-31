import { TestBed } from '@angular/core/testing';
import { MotionService } from '../core/motion.service';
import { Cursor } from './cursor';

describe('Cursor', () => {
  it('does not touch its animation nodes before the view exists', () => {
    const motion = {
      interactive: true,
      onFrame: (tick: (time: number) => void) => {
        tick(0);
        return () => {};
      },
    };

    TestBed.configureTestingModule({
      imports: [Cursor],
      providers: [{ provide: MotionService, useValue: motion }],
    });

    expect(() => {
      const fixture = TestBed.createComponent(Cursor);
      fixture.detectChanges();
    }).not.toThrow();
  });
});
