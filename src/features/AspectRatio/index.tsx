import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { calculateAspectRatioValues, type AspectRatioField } from "./calc"

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
      <div>
        <label>
          ratioW
          <input
            type="text"
            value={values.ratioW}
            onChange={makeChangeHandler("ratioW", values, setValues)}
          />
        </label>
      </div>
      <div>
        <label>
          ratioH
          <input
            type="text"
            value={values.ratioH}
            onChange={makeChangeHandler("ratioH", values, setValues)}
          />
        </label>
      </div>
      <div>
        <label>
          pxWidth
          <input
            type="text"
            value={values.pxWidth}
            onChange={makeChangeHandler("pxWidth", values, setValues)}
          />
        </label>
      </div>
      <div>
        <label>
          pxHeight
          <input
            type="text"
            value={values.pxHeight}
            onChange={makeChangeHandler("pxHeight", values, setValues)}
          />
        </label>
      </div>
    </div>
  )
}

export default AspectRatio
