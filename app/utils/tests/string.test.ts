import {describe, expect, test} from 'vitest';
import {toInitialCap} from '../string';

describe('string utils', () => {
  test('toInitialCap', () => {
    expect(toInitialCap('foo bar')).toBe('Foo bar');
    expect(toInitialCap('Foo bar')).toBe('Foo bar');
    expect(toInitialCap('-foo bar')).toBe('-foo bar');
    expect(toInitialCap('')).toBe('');
    expect(toInitialCap()).toBeUndefined();
  });
});
