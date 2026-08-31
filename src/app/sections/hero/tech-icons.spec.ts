import { TECH_ICONS } from './tech-icons';

describe('TECH_ICONS', () => {
  it('maps each hero technology to a local asset', () => {
    expect(TECH_ICONS).toHaveLength(10);
    expect(TECH_ICONS.every(({ src }) => src.startsWith('assets/tech/'))).toBe(true);
  });
});
