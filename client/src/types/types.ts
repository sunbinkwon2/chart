export type ChartType = 'LINE' | 'SCATTER'

export interface Point {
  x: number
  y: number
}

export interface Band {
  x: number
  usl: number
  lsl: number
  ucl: number
  lcl: number
}

export interface ChartOptions {
  marker: 'point' | 'line' | 'line+point'
  showChamberStep: boolean
  showLegend: boolean
  downSample: boolean
}

export interface ChartSize {
  width: number
  height: number
}

export interface ChartMeta {
  title: string
  subtitle: string
  legend: string
}

export interface ChartData {
  points: Point[]
  bands: Band[]
  options: ChartOptions
  meta: ChartMeta
  type: ChartType
  size: ChartSize
}

export interface ChartImage {
  dataUrl: string
}

export interface ApiResponse<T> {
  success: boolean
  result: T
}
