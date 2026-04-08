import { describe, it, expect } from 'vitest'
import { calculateCosts } from './calc'

describe('calculateCosts', () => {
  it('should calculate costs correctly when period is year', () => {
    const result = calculateCosts(1200, 'year');
    expect(result.annual).toBe(1200);
    expect(result.monthly).toBe(100);
    expect(result.daily).toBeCloseTo(1200 / 365);
  });

  it('should calculate costs correctly when period is month', () => {
    const result = calculateCosts(100, 'month');
    expect(result.annual).toBe(1200);
    expect(result.monthly).toBe(100);
    expect(result.daily).toBeCloseTo(1200 / 365);
  });

  it('should calculate costs correctly when period is day', () => {
    const result = calculateCosts(1200 / 365, 'day');
    expect(result.annual).toBe(1200);
    expect(result.monthly).toBe(100);
    expect(result.daily).toBeCloseTo(1200 / 365);
  });
});