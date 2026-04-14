import { useMemo, useState, type ChangeEvent } from 'react'
import { convertPacketsToBytes } from './calc'

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
    <div style={{ padding: '20px' }}>
      <h2>Packets to Bytes Converter</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="packet-input" style={{ display: 'block', marginBottom: '8px' }}>
          値を入力してください
        </label>
        <input
          id="packet-input"
          type="text"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          placeholder="数値を入力"
          style={{
            width: '100%',
            maxWidth: '320px',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="unit-select" style={{ display: 'block', marginBottom: '8px' }}>
          単位を選択
        </label>
        <select
          id="unit-select"
          value={unit}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setUnit(event.target.value as PacketUnit)}
          style={{
            width: '100%',
            maxWidth: '200px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        >
          {units.map((option) => (
            <option key={option} value={option}>
              {unitLabels[option]}
            </option>
          ))}
        </select>
      </div>

      {parsedValue === null ? (
        <p style={{ color: '#b00020' }}>有効な数値を入力してください。</p>
      ) : (
        result && (
          <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <h3>変換結果</h3>
            <p>Packets: {result.packets}</p>
            <p>Bytes: {result.bytes}</p>
            <p>KB: {result.KB}</p>
            <p>MB: {result.MB}</p>
          </div>
        )
      )}
    </div>
  )
}

export default PacketsToBytes
