export type ParsedIpAndMask = {
  ip: number[]
  subnetMask: number
}

export type NetworkCalculationResult = {
  networkAddress: string
  broadcastAddress: string
  numberOfIPs: number
  subnetMask: string
}

export function parseIpAndMask(input: string): ParsedIpAndMask {
  const [ipString, maskString] = input.trim().split('/')
  const ip = ipString?.split('.').map((part) => Number(part)) ?? []
  return {
    ip,
    subnetMask: Number(maskString),
  }
}

export function validateIpAndMask(parsed: ParsedIpAndMask): boolean {
  const { ip, subnetMask } = parsed

  const isValidOctet = (value: number) =>
    Number.isInteger(value) && value >= 0 && value <= 255

  return (
    Array.isArray(ip) &&
    ip.length === 4 &&
    ip.every(isValidOctet) &&
    Number.isInteger(subnetMask) &&
    subnetMask >= 0 &&
    subnetMask <= 32
  )
}

const toUint32 = (parts: number[]) =>
  parts.reduce((acc, octet) => (acc << 8) | octet, 0) >>> 0

const formatDottedDecimal = (value: number) =>
  [
    (value >>> 24) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 8) & 0xff,
    value & 0xff,
  ].join('.')

export function calculateNetworkInfo(
  ip: number[],
  subnetMask: number,
): NetworkCalculationResult {
  if (!validateIpAndMask({ ip, subnetMask })) {
    throw new Error('Invalid IP address or subnet mask')
  }

  const ipInt = toUint32(ip)
  const maskInt = subnetMask === 0 ? 0 : (0xffffffff << (32 - subnetMask)) >>> 0
  const networkInt = ipInt & maskInt
  const broadcastInt = networkInt | (~maskInt >>> 0)

  return {
    networkAddress: formatDottedDecimal(networkInt),
    broadcastAddress: formatDottedDecimal(broadcastInt),
    numberOfIPs: 2 ** (32 - subnetMask),
    subnetMask: formatDottedDecimal(maskInt),
  }
}
