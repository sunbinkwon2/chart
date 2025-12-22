import { z } from 'zod'

export const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
})

export const BandSchema = z.object({
  x: z.number(),
  usl: z.number(),
  lsl: z.number(),
  ucl: z.number(),
  lcl: z.number(),
})

export const ChartOptionsSchema = z.object({
  marker: z.enum(['point', 'line', 'line+point']),
  showChamberStep: z.boolean(),
  showLegend: z.boolean(),
  downSample: z.boolean(),
})

export const ChartSizeSchema = z.object({
  width: z.number(),
  height: z.number(),
})

export const ChartMetaSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  legend: z.string(),
})

export const ChartDataSchema = z.object({
  points: z.array(PointSchema),
  bands: z.array(BandSchema),
  options: ChartOptionsSchema,
  meta: ChartMetaSchema,
  type: z.enum(['LINE', 'SCATTER']),
  size: ChartSizeSchema,
})

export const ChartImageSchema = z.object({
  dataUrl: z.string(),
})

export const ApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    success: z.boolean(),
    result: schema,
  })
