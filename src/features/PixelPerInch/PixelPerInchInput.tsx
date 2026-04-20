import { type ChangeEvent } from 'react'
import styles from "../../components/Form/Form.module.css"

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
  <div className={styles.field}>
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
)
