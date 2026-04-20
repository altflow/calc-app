import { useMemo, useState } from 'react'
import { calculatePixelPerInch } from './calc'
import { PixelPerInchInput } from './PixelPerInchInput'
import styles from "../../components/Form/Form.module.css"

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
    <div>
      <h2 className={styles.title}>Pixel Per Inch (PPI) Calculator</h2>

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
        <div className={styles.result}>
          <h3>計算結果</h3>
          <div className={styles.resultItem}>PPI: {ppi.toFixed(3)}</div>
        </div>
      ) : (
        <div className={styles.error}>
          有効な数値をすべて入力してください。
        </div>
      )}
    </div>
  )
}

export default PixelPerInch
