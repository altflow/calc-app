import React, { useMemo, useState, type ChangeEvent } from 'react'
import { calculateNetworkInfo, parseIpAndMask, validateIpAndMask } from './calc'
import styles from "../../components/Form/Form.module.css"

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
    <div>
      <h2 className={styles.title}>Network Address Calculator</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="network-input">
          Network address (IP Address/Subnet mask)
        </label>
        <input
          id="network-input"
          className={styles.input}
          type="text"
          value={cidr}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setCidr(event.target.value)}
          placeholder="192.168.1.0/24"
        />
      </div>

      {isValid && result ? (
        <div className={styles.result}>
          <h3>計算結果</h3>
          <div className={styles.resultItem}>Network Address: {result.networkAddress}</div>
          <div className={styles.resultItem}>Broadcast Address: {result.broadcastAddress}</div>
          <div className={styles.resultItem}>Number of IPs: {result.numberOfIPs}</div>
          <div className={styles.resultItem}>Subnet Mask: {result.subnetMask}</div>
        </div>
      ) : cidr.trim() ? (
        <div className={styles.error}>
          有効な IP アドレスとサブネットマスクを「192.168.1.0/24」の形式で入力してください。
        </div>
      ) : null}
    </div>
  )
}

export default NetworkAddress
