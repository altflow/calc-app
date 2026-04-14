export type PacketsToBytesUnit = 'packets' | 'bytes' | 'KB' | 'MB'

export interface PacketsToBytesResult {
  packets: number
  bytes: number
  KB: number
  MB: number
}

const BYTES_PER_PACKET = 128
const BYTES_PER_KB = 1024
const BYTES_PER_MB = BYTES_PER_KB * BYTES_PER_KB

const toBytes = (value: number, unit: PacketsToBytesUnit): number => {
  switch (unit) {
    case 'packets':
      return value * BYTES_PER_PACKET
    case 'bytes':
      return value
    case 'KB':
      return value * BYTES_PER_KB
    case 'MB':
      return value * BYTES_PER_MB
    default:
      return value
  }
}

export function convertPacketsToBytes(
  value: number,
  unit: PacketsToBytesUnit,
): PacketsToBytesResult {
  const bytes = toBytes(value, unit)

  return {
    packets: bytes / BYTES_PER_PACKET,
    bytes,
    KB: bytes / BYTES_PER_KB,
    MB: bytes / BYTES_PER_MB,
  }
}
