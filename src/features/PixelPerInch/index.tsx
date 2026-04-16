import { useMemo, useState } from 'react'
import { calculatePixelPerInch } from './calc'
import { PixelPerInchInput } from './PixelPerInchInput'

const PixelPerInch = () => {
  const [inches, setInches] = useState('13.3')
  const [pxWidth, setPxWidth] = useState('1920')
  const [pxHeight, setPxHeight] = useState('1080')

  const ppi = useMemo(() => {
    const parsedInches = Number(inches)
    const parsedWidth = Number(pxWidth)
    const parsedHeight = Number(pxHeight)

    if (
      !Number.isFinite(parsedInches) || parsedInches <= 0 ||
      !Number.isFinite(parsedWidth) || parsedWidth <= 0 ||
      !Number.isFinite(parsedHeight) || parsedHeight <= 0
    ) {
      return null
    }

    return calculatePixelPerInch(parsedInches, parsedWidth, parsedHeight)
  }, [inches, pxWidth, pxHeight])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pixel Per Inch (PPI) Calculator</h2>

      <PixelPerInchInput
        id="inches"
        label="インチ数"
        value={inches}
        onChange={(event) => setInches(event.target.value)}
        placeholder="例: 13.3"
      />
      <PixelPerInchInput
        id="pxWidth"
        label="横ピクセル数"
        value={pxWidth}
        onChange={(event) => setPxWidth(event.target.value)}
        placeholder="例: 1920"
      />
      <PixelPerInchInput
        id="pxHeight"
        label="縦ピクセル数"
        value={pxHeight}
        onChange={(event) => setPxHeight(event.target.value)}
        placeholder="例: 1080"
      />

      {ppi !== null ? (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>計算結果</h3>
          <p>PPI: {ppi.toFixed(3)}</p>
        </div>
      ) : (
        <p style={{ marginTop: '24px', color: '#b00020' }}>
          有効な数値をすべて入力してください。
        </p>
      )}
    </div>
  )
}

export default PixelPerInch
