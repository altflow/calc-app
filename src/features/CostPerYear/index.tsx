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
          金額:
        </label>
        <input
          id="amount"
          className={styles.input}
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="金額を入力"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.label}>期間の単位:</p>
        {(['day', 'month', 'year'] as const).map((p) => (
          <label key={p} className={styles.label}>
            <input
              type="radio"
              name="period"
              value={p}
              checked={period === p}
              onChange={(e) => setPeriod(e.target.value as 'day' | 'month' | 'year')}
            />
            {p === 'day' ? '日あたり' : p === 'month' ? '月あたり' : '年あたり'}
          </label>
        ))}
      </div>

      {result && (
        <div className={styles.result}>
          <h3>計算結果:</h3>
          <div className={styles.resultItem}>年間コスト: {result.annual.toFixed(2)}</div>
          <div className={styles.resultItem}>月間コスト: {result.monthly.toFixed(2)}</div>
          <div className={styles.resultItem}>日ごとのコスト: {result.daily.toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}

export default CostPerYear
