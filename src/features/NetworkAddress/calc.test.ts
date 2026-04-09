import { describe, it, expect } from 'vitest'
import { calculateNetworkInfo, parseIpAndMask, validateIpAndMask } from './calc'

describe('NetworkAddress calculation', () => {
  it('parses IP and mask from CIDR string', () => {
    expect(parseIpAndMask('192.168.1.0/24')).toEqual({
      ip: [192, 168, 1, 0],
      subnetMask: 24,
    })
  })

  it('validates correct IP and mask', () => {
    expect(validateIpAndMask({ ip: [10, 0, 0, 1], subnetMask: 16 })).toBe(true)
    expect(validateIpAndMask({ ip: [256, 0, 0, 1], subnetMask: 16 })).toBe(false)
    expect(validateIpAndMask({ ip: [10, 0, 0], subnetMask: 16 })).toBe(false)
    expect(validateIpAndMask({ ip: [10, 0, 0, 1], subnetMask: 33 })).toBe(false)
  })

  it('calculates network info using bit operations', () => {
    const result = calculateNetworkInfo([192, 168, 1, 10], 24)

    expect(result.networkAddress).toBe('192.168.1.0')
    expect(result.broadcastAddress).toBe('192.168.1.255')
    expect(result.numberOfIPs).toBe(256)
    expect(result.subnetMask).toBe('255.255.255.0')
  })

  it('handles /32 correctly', () => {
    const result = calculateNetworkInfo([10, 0, 0, 1], 32)

    expect(result.networkAddress).toBe('10.0.0.1')
    expect(result.broadcastAddress).toBe('10.0.0.1')
    expect(result.numberOfIPs).toBe(1)
    expect(result.subnetMask).toBe('255.255.255.255')
  })
})
