import type { ChartData, ApiResponse } from '@/types/chart.type'
import { http } from '@/lib/http'
import { z } from 'zod'
import { ChartDataSchema, ChartImageSchema, ApiResponseSchema } from '@/schemas/chart.schema'

export async function fetchChartData(chartId: number): Promise<ApiResponse> {
  const res = await http.get(`/chart/${chartId}/data`)
  const parsed = ApiResponseSchema(ChartDataSchema).parse(res.data)
  return parsed.result
}

export async function fetchChartImage(chartId: number): Promise<ApiResponse> {
  const res = await http.get(`/chart/${chartId}/image`)
  const parsed = ApiResponseSchema(ChartImageSchema).parse(res.data)
  return parsed.result
}
