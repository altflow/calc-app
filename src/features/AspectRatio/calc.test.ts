import { describe, it, expect } from 'vitest'
import { calculateAspectRatioValues } from './calc'

describe('calculateAspectRatioValues', () => {
  it('ratioW を変更したとき pxWidth が正しく計算される', () => {
    const result = calculateAspectRatioValues(16, 3, 800, 600, 'ratioW')
    expect(result.pxWidth).toBe(3200) // (600 * 16) / 3 = 3200
    expect(result.pxHeight).toBe(600)
    expect(result.ratioW).toBe(16)
    expect(result.ratioH).toBe(3)
  })

  it('ratioH を変更したとき pxHeight が正しく計算される', () => {
    const result = calculateAspectRatioValues(16, 9, 1600, 1000, 'ratioH')
    expect(result.pxWidth).toBe(1600)
    expect(result.pxHeight).toBe(900) // (1600 * 9) / 16 = 900
    expect(result.ratioW).toBe(16)
    expect(result.ratioH).toBe(9)
  })

  it('pxWidth を変更したとき pxHeight が正しく計算される', () => {
    const result = calculateAspectRatioValues(16, 9, 1000, 600, 'pxWidth')
    expect(result.pxWidth).toBe(1000)
    expect(result.pxHeight).toBeCloseTo(562.5) // (1000 * 9) / 16 = 562.5
    expect(result.ratioW).toBe(16)
    expect(result.ratioH).toBe(9)
  })

  it('pxHeight を変更したとき pxWidth が正しく計算される', () => {
    const result = calculateAspectRatioValues(16, 9, 800, 500, 'pxHeight')
    expect(result.pxWidth).toBeCloseTo(888.8888888888889) // (500 * 16) / 9 ≈ 888.888
    expect(result.pxHeight).toBe(500)
    expect(result.ratioW).toBe(16)
    expect(result.ratioH).toBe(9)
  })
})
