import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { calculateAspectRatioValues, type AspectRatioField } from "./calc"
import styles from "../../components/Form/Form.module.css"

const parseNumber = (value: string): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const isValidNumberSet = (
  ratioW: string,
  ratioH: string,
  pxWidth: string,
  pxHeight: string,
): boolean => {
  return [ratioW, ratioH, pxWidth, pxHeight].every((value) => {
    const parsed = Number(value)
    return Number.isFinite(parsed)
  })
}

const makeChangeHandler = (
  field: AspectRatioField,
  values: {
    ratioW: string
    ratioH: string
    pxWidth: string
    pxHeight: string
  },
  setValues: Dispatch<
    SetStateAction<{
      ratioW: string
      ratioH: string
      pxWidth: string
      pxHeight: string
    }>
  >,
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    const nextValues = {
      ...values,
      [field]: nextValue,
    }

    if (isValidNumberSet(nextValues.ratioW, nextValues.ratioH, nextValues.pxWidth, nextValues.pxHeight)) {
      const ratioW = parseNumber(nextValues.ratioW)!
      const ratioH = parseNumber(nextValues.ratioH)!
      const pxWidth = parseNumber(nextValues.pxWidth)!
      const pxHeight = parseNumber(nextValues.pxHeight)!
      const calculated = calculateAspectRatioValues(ratioW, ratioH, pxWidth, pxHeight, field)

      setValues({
        ratioW: String(calculated.ratioW),
        ratioH: String(calculated.ratioH),
        pxWidth: String(calculated.pxWidth),
        pxHeight: String(calculated.pxHeight),
      })
    } else {
      setValues(nextValues)
    }
  }
}

const AspectRatio = () => {
  const [values, setValues] = useState({
    ratioW: "16",
    ratioH: "9",
    pxWidth: "1920",
    pxHeight: "1080",
  })

  return (
    <div>
      <h2 className={styles.title}>Aspect Ratio Calculator</h2>
      <div className={styles.field}>
        <label className={styles.label}>ratioW</label>
        <input
          className={styles.input}
          type="text"
          value={values.ratioW}
          onChange={makeChangeHandler("ratioW", values, setValues)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>ratioH</label>
        <input
          className={styles.input}
          type="text"
          value={values.ratioH}
          onChange={makeChangeHandler("ratioH", values, setValues)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>pxWidth</label>
        <input
          className={styles.input}
          type="text"
          value={values.pxWidth}
          onChange={makeChangeHandler("pxWidth", values, setValues)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>pxHeight</label>
        <input
          className={styles.input}
          type="text"
          value={values.pxHeight}
          onChange={makeChangeHandler("pxHeight", values, setValues)}
        />
      </div>
    </div>
  )
}

export default AspectRatio
