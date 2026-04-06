export type AspectRatioCalcResult = {
  ratioW: number
  ratioH: number
  pxWidth: number
  pxHeight: number
}

export type AspectRatioField = "ratioW" | "ratioH" | "pxWidth" | "pxHeight"

const calcTarget = (src: number, required0: number, required1: number): number => {
  return (src * required0) / required1
}

export const calculateAspectRatioValues = (
  ratioW: number,
  ratioH: number,
  pxWidth: number,
  pxHeight: number,
  changedField: AspectRatioField,
): AspectRatioCalcResult => {
  switch (changedField) {
    case "ratioW":
      return {
        ratioW,
        ratioH,
        pxWidth: calcTarget(pxHeight, ratioW, ratioH),
        pxHeight,
      }

    case "ratioH":
      return {
        ratioW,
        ratioH,
        pxWidth,
        pxHeight: calcTarget(pxWidth, ratioH, ratioW),
      }

    case "pxWidth":
      return {
        ratioW,
        ratioH,
        pxWidth,
        pxHeight: calcTarget(pxWidth, ratioH, ratioW),
      }

    case "pxHeight":
      return {
        ratioW,
        ratioH,
        pxWidth: calcTarget(pxHeight, ratioW, ratioH),
        pxHeight,
      }

    default:
      return {
        ratioW,
        ratioH,
        pxWidth,
        pxHeight,
      }
  }
}
