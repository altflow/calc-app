export function calculatePixelPerInch(inches: number, pxWidth: number, pxHeight: number): number {
  const diagonalPixels = Math.sqrt(pxWidth * pxWidth + pxHeight * pxHeight)
  const ppi = diagonalPixels / inches
  return Number(ppi.toFixed(3))
}
