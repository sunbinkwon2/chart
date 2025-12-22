export type ChartType = 'LINE' | 'SCATTER';

// 개별 포인트 (라인/산점도 등)
export interface Point {
  x: number
  y: number
}

// 관리선 / 밴드 데이터
export interface Band {
  x: number
  usl?: number // Upper Spec Limit
  lsl?: number // Lower Spec Limit
  ucl?: number // Upper Control Limit
  lcl?: number // Lower Control Limit
}

// 차트 옵션
export interface ChartOptions {
  marker?: 'point' | 'line' | 'line+point'
  showChamberStep?: boolean
  showLegend?: boolean
  downSample?: boolean
}

export interface ChartOptions {
  width: number
  height: number
}

// 메타 정보
export interface ChartMeta {
  title: string
  subTitle?: string
  legend?: string
}

// 최종 요청 객체
export interface ChartRequest {
  points: Point[]
  bands?: Band[]
  options?: ChartOptions
  meta: ChartMeta
  type: ChartType
  size: ChartSize
}

export interface ChartResponse {
  dataUrl: string
  options?: ChartOptions
  meta: ChartMeta
  chartType : ChartType
}

interface BaseChartRequest {
  chartType: ChartType;
  options?: ChartOptions;
  meta: ChartMeta;
}

export interface LineChartRequest extends BaseChartRequest {
  chartType: 'LINE';
  points: Point[];
  bands?: Band[];
}

export interface ScatterChartRequest extends BaseChartRequest {
  chartType: 'SCATTER';
  points: Point[];
  bands?: Band[];
}

interface BaseChartResponse {
  chartType: ChartType;
  dataUrl: string; // 렌더링 결과
  meta: ChartMeta;
}

export interface LineChartResponse extends BaseChartResponse {
  chartType: 'LINE';
}

export interface ScatterChartResponse extends BaseChartResponse {
  chartType: 'SCATTER';
}

export type ChartResponse = LineChartResponse | ScatterChartResponse;

export interface ApiResponse<T> {
  success: boolean;
  result: T;
}
