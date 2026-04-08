import { useState, useMemo } from 'react'
import { calculateCosts, type CostBreakdown } from './calc'

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
    <div style={{ padding: '20px' }}>
      <h2>Cost Per Year Calculator</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="amount" style={{ display: 'block', marginBottom: '8px' }}>
          金額:
        </label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="金額を入力"
          style={{
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '300px',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginBottom: '8px' }}>期間の単位:</p>
        {(['day', 'month', 'year'] as const).map((p) => (
          <label key={p} style={{ display: 'block', marginBottom: '8px' }}>
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
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>計算結果:</h3>
          <p>年間コスト: {result.annual.toFixed(2)}</p>
          <p>月間コスト: {result.monthly.toFixed(2)}</p>
          <p>日ごとのコスト: {result.daily.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}

export default CostPerYear
