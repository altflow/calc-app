import { type ChangeEvent } from 'react'

interface PixelPerInchInputProps {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export const PixelPerInchInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}: PixelPerInchInputProps) => (
  <div style={{ marginBottom: '16px' }}>
    <label htmlFor={id} style={{ display: 'block', marginBottom: '8px' }}>
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        maxWidth: '280px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
      }}
    />
  </div>
)
