import { describe, it, expect } from 'vitest'
import { convertPacketsToBytes } from './calc'

describe('convertPacketsToBytes', () => {
  it('converts packets to bytes, KB, and MB', () => {
    const result = convertPacketsToBytes(2, 'packets')
    expect(result.packets).toBe(2)
    expect(result.bytes).toBe(256)
    expect(result.KB).toBeCloseTo(0.25)
    expect(result.MB).toBeCloseTo(0.000244140625)
  })

  it('converts bytes to packets, KB, and MB', () => {
    const result = convertPacketsToBytes(1024, 'bytes')
    expect(result.packets).toBe(8)
    expect(result.bytes).toBe(1024)
    expect(result.KB).toBe(1)
    expect(result.MB).toBeCloseTo(0.0009765625)
  })

  it('converts KB to packets, bytes, and MB', () => {
    const result = convertPacketsToBytes(1, 'KB')
    expect(result.bytes).toBe(1024)
    expect(result.KB).toBe(1)
    expect(result.packets).toBe(8)
    expect(result.MB).toBeCloseTo(0.0009765625)
  })

  it('converts MB to packets, bytes, and KB', () => {
    const result = convertPacketsToBytes(1, 'MB')
    expect(result.bytes).toBe(1048576)
    expect(result.KB).toBe(1024)
    expect(result.MB).toBe(1)
    expect(result.packets).toBe(8192)
  })
})
