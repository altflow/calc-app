import { describe, it, expect } from 'vitest'
import { calculatePixelPerInch } from './calc'

describe('calculatePixelPerInch', () => {
  it('should calculate PPI and round to 3 decimal places', () => {
    const ppi = calculatePixelPerInch(13.3, 1920, 1080)
    expect(ppi).toBe(165.632)
  })

  it('should calculate correctly for square pixels', () => {
    const ppi = calculatePixelPerInch(5, 800, 800)
    expect(ppi).toBe(226.274)
  })
})
