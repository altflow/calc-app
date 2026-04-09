import React, { useMemo, useState, type ChangeEvent } from 'react'
import { calculateNetworkInfo, parseIpAndMask, validateIpAndMask } from './calc'

const NetworkAddress: React.FC = () => {
  const [cidr, setCidr] = useState('192.168.1.0/24')

  const parsed = useMemo(() => cidr.trim() ? parseIpAndMask(cidr) : null, [cidr])
  const isValid = useMemo(() => parsed ? validateIpAndMask(parsed) : false, [parsed])

  const result = useMemo(() => {
    if (!isValid || !parsed) {
      return null
    }

    try {
      return calculateNetworkInfo(parsed.ip, parsed.subnetMask)
    } catch {
      return null
    }
  }, [isValid, parsed])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Network Address Calculator</h2>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="network-input" style={{ display: 'block', marginBottom: '8px' }}>
          Network address (IP Address/Subnet mask)
        </label>
        <input
          id="network-input"
          type="text"
          value={cidr}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setCidr(event.target.value)}
          placeholder="192.168.1.0/24"
          style={{
            width: '100%',
            maxWidth: '320px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </div>

      {isValid && result ? (
        <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>計算結果</h3>
          <p>Network Address: {result.networkAddress}</p>
          <p>Broadcast Address: {result.broadcastAddress}</p>
          <p>Number of IPs: {result.numberOfIPs}</p>
          <p>Subnet Mask: {result.subnetMask}</p>
        </div>
      ) : cidr.trim() ? (
        <p style={{ color: '#b00020' }}>
          有効な IP アドレスとサブネットマスクを「192.168.1.0/24」の形式で入力してください。
        </p>
      ) : null}
    </div>
  )
}

export default NetworkAddress
