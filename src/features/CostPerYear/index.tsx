import { useState, useMemo } from 'react'
import { calculateCosts, type CostBreakdown } from './calc'
import styles from "../../components/Form/Form.module.css"

const CostPerYear = () => {
  const [amount, setAmount] = useState<string>('100')
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month')

  const result: CostBreakdown | null = useMemo(() => {
    const parsedAmount = parseFloat(amount)
    if (Number.isFinite(parsedAmount) && parsedAmount > 0) {
      return calculateCosts(parsedAmount, period)
    }
    return null
  }, [amount, period])

  return (
    <div>
      <h2 className={styles.title}>Cost Per Year Calculator</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="amount">
          Cost:
        </label>
        <input
          id="amount"
          className={styles.input}
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Period:</p>
        {(['day', 'month', 'year'] as const).map((p) => (
          <label key={p} className={styles.label}>
            <input
              type="radio"
              name="period"
              value={p}
              checked={period === p}
              onChange={(e) => setPeriod(e.target.value as 'day' | 'month' | 'year')}
            />
            {p === 'day' ? 'Daily' : p === 'month' ? 'Monthly' : 'Yearly'}
          </label>
        ))}
      </div>

      {result && (
        <div className={styles.result}>
          <h3>Calculation Result:</h3>
          <div className={styles.resultItem}>Annual Cost: {result.annual.toFixed(2)}</div>
          <div className={styles.resultItem}>Monthly Cost: {result.monthly.toFixed(2)}</div>
          <div className={styles.resultItem}>Daily Cost: {result.daily.toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}

export default CostPerYear
