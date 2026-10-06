import { describe, expect, it } from 'vitest'
import { buildLineChart } from './chart.js'

const BOX = {
  width: 200,
  height: 100,
  padding: { top: 10, right: 10, bottom: 20, left: 10 },
}
const POINTS = [
  { x: 0, y: 10 },
  { x: 5, y: 20 },
  { x: 10, y: 40 },
]

describe('buildLineChart', () => {
  const chart = buildLineChart({ points: POINTS, ...BOX })

  it('spreads x across the padded width', () => {
    expect(chart.coordinates[0].x).toBe(10)
    expect(chart.coordinates[1].x).toBe(100)
    expect(chart.coordinates[2].x).toBe(190)
  })

  it('puts the highest value at the top of the padded area and lower values below it', () => {
    expect(chart.coordinates[2].y).toBe(10)
    expect(chart.coordinates[0].y).toBeGreaterThan(chart.coordinates[1].y)
    expect(chart.coordinates[1].y).toBeGreaterThan(chart.coordinates[2].y)
  })

  it('starts the y axis at zero by default, so growth is proportional', () => {
    // 10 is a quarter of 40, so it sits a quarter of the way up the 70px plot.
    expect(chart.coordinates[0].y).toBe(10 + 0.75 * 70)
  })

  it('draws a line through every point', () => {
    expect(chart.linePath).toBe('M10 62.5 L100 45 L190 10')
  })

  it('closes the area down to the baseline', () => {
    expect(chart.baselineY).toBe(80)
    expect(chart.areaPath).toBe('M10 62.5 L100 45 L190 10 L190 80 L10 80 Z')
  })
})
