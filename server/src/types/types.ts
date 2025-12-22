// 개별 포인트 (라인/산점도 등)
export interface Point {
  x: number
  y: number
}

// 관리선 / 밴드 데이터
export interface Band {
  x: number
  usl: number // Upper Spec Limit
  lsl: number // Lower Spec Limit
  ucl: number // Upper Control Limit
  lcl: number // Lower Control Limit
}

// 차트 옵션
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

// 메타 정보
export interface ChartMeta {
  title: string
  subtitle: string
  legend: string
}

export interface BaseChartRequest {
  chartId? : string;
  points: Point[]
  bands: Band[]
  options: ChartOptions
  meta: ChartMeta
  type: ChartType
  size: ChartSize
}

export interface LineChartRequest extends BaseChartRequest {
  chartId? : string;
  type: 'LINE';
  points: Point[];
  bands: Band[];
}

export interface ScatterChartRequest extends BaseChartRequest {
  chartId? : string;
  type: 'SCATTER';
  points: Point[];
  bands: Band[];
}

export interface BaseChartResponse {
  dataUrl: string
  options: ChartOptions
  meta: ChartMeta
}

export interface LineChartResponse extends BaseChartResponse {
  type: 'LINE'
}

export interface ScatterChartResponse extends BaseChartResponse {
  type: 'SCATTER'
}

export type ChartResponse =
  | LineChartResponse
  | ScatterChartResponse


export interface ApiResponse<T> {
  success: boolean;
  result: T;
}

// 최종 요청 객체
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