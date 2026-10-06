// Turns data points into SVG coordinates for the small forecast chart. Pure geometry, no drawing.

const round = (value) => Math.round(value * 100) / 100

/**
 * Maps `points` ({ x, y } in data units) into a `width` by `height` box inside `padding`.
 * The y axis starts at `yMin` (0 by default) so growth looks proportional, and higher values sit higher.
 * Returns the pixel `coordinates`, a `linePath` and a closed `areaPath` down to the baseline.
 */
export function buildLineChart({ points, width, height, padding, yMin = 0 }) {
  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMax = Math.max(...ys)

  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom
  const baselineY = padding.top + plotHeight

  const coordinates = points.map((point) => ({
    x: round(padding.left + ((point.x - xMin) / (xMax - xMin)) * plotWidth),
    y: round(padding.top + (1 - (point.y - yMin) / (yMax - yMin)) * plotHeight),
  }))

  const linePath = coordinates
    .map(
      (coordinate, index) =>
        `${index === 0 ? 'M' : 'L'}${coordinate.x} ${coordinate.y}`,
    )
    .join(' ')
  const last = coordinates[coordinates.length - 1]
  const first = coordinates[0]
  const areaPath = `${linePath} L${last.x} ${baselineY} L${first.x} ${baselineY} Z`

  return { coordinates, linePath, areaPath, baselineY }
}
