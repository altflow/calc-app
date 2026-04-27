import { useMemo, useState, type ChangeEvent } from 'react'
import { convertPacketsToBytes } from './calc'
import styles from "../../components/Form/Form.module.css"

const parseNumber = (value: string): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const unitLabels: Record<string, string> = {
  packets: 'Packets',
  bytes: 'Bytes',
  KB: 'KB',
  MB: 'MB',
}

const units = ['packets', 'bytes', 'KB', 'MB'] as const

type PacketUnit = (typeof units)[number]

const PacketsToBytes = () => {
  const [value, setValue] = useState('1')
  const [unit, setUnit] = useState<PacketUnit>('packets')

  const parsedValue = useMemo(() => parseNumber(value), [value])

  const result = useMemo(() => {
    if (parsedValue === null) {
      return null
    }
    return convertPacketsToBytes(parsedValue, unit)
  }, [parsedValue, unit])

  return (
    <div>
      <h2 className={styles.title}>Packets to Bytes Converter</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="packet-input">
          Input Value
        </label>
        <input
          id="packet-input"
          className={styles.input}
          type="text"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          placeholder="Enter value"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="unit-select">
          Select Unit
        </label>
        <select
          id="unit-select"
          className={styles.input}
          value={unit}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setUnit(event.target.value as PacketUnit)}
        >
          {units.map((option) => (
            <option key={option} value={option}>
              {unitLabels[option]}
            </option>
          ))}
        </select>
      </div>

      {parsedValue === null ? (
        <div className={styles.error}>Please enter a valid number.</div>
      ) : (
        result && (
          <div className={styles.result}>
            <h3>Conversion Result</h3>
            <div className={styles.resultItem}>Packets: {result.packets}</div>
            <div className={styles.resultItem}>Bytes: {result.bytes}</div>
            <div className={styles.resultItem}>KB: {result.KB}</div>
            <div className={styles.resultItem}>MB: {result.MB}</div>
          </div>
        )
      )}
    </div>
  )
}

export default PacketsToBytes
