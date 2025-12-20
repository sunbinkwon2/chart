export type ChartType = 'LINE' | 'SCATTER';

export interface LinePoint {
  x: number;
  y: number;
}

export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ChartRequest {
  type: ChartType;
  data: LinePoint[] | ScatterPoint[];
}