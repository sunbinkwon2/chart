<template>
  <div :id="chartId" class="fill"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { emptyFill, SolidFill, SolidLine } from '@lightningchart/lcjs'
import lc from '@/lib/lcjs'
import {Point, Band, ChartOptions, ChartSize, ChartMeta, ChartData, ChartImage, ChartType} from '@/types/types'

// Props
const props = defineProps<{ chartData: ChartData, meta: ChartMeta, points: Point[], bands: Band[], options: ChartOptions, size:ChartSize, type: ChartType }>()

// Chart container ID
const chartId = ref(`chart-${Math.trunc(Math.random() * 1000000)}`)

let chart: any = null
let lcInstance: any = null

const createChart = () => {
  lcInstance = lc
  chart = lcInstance.ChartXY({ container: chartId.value })
  chart.setTitle(props.type === 'LINE' ? 'Line Chart' : 'Scatter Chart')

  // 1️⃣ Series 생성
  let series: any
  if (props.type === 'LINE') {
    series = chart
      .addPointLineAreaSeries({ dataPattern: 'ProgressiveX' })
      .setAreaFillStyle(emptyFill)
    series.setStrokeStyle((style: any) => style.setThickness(3))
  } else {
    series = chart.addPointSeries()
    // series.setPointFillStyle(new SolidFill({ color: 0xff0000 })) // 빨간 점
    // series.setPointSize(10)
  }

  // 2️⃣ Marker 옵션 적용
  if (props.type === 'LINE') {
    // series = chart.addPointLineAreaSeries({ dataPattern: 'ProgressiveX' })

    const showPoint = props.options?.marker === 'point' || props.options?.marker === 'line+point'
    const showLine = props.options?.marker === 'line' || props.options?.marker === 'line+point'

    // series.setPointFillStyle((style) => style.setSize(showPoint ? 8 : 0))
    // series.setStrokeStyle((style) => style.setThickness(showLine ? 2 : 0))
  }


  // 3️⃣ Points 데이터 추가
  series.appendJSON(props.points)

  // 4️⃣ Bands (관리선) 추가
  // if (props.bands) {
  //   props.bands.forEach((band) => {
  //     chart.addLineSeries()
  //       .add(band.usl, band.x)
  //       .setStrokeStyle(new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: 0x00ff00 }) }))
  //     chart.addLineSeries()
  //       .add(band.lsl, band.x)
  //       .setStrokeStyle(new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: 0xff0000 }) }))
  //   })
  // }

  // 5️⃣ 추가 옵션 처리 (legend, chamber step 등)
  // if (props.options?.showLegend) {
  //   chart.setLegendVisible(true)
  // }
  // showChamberStep, downSample 등은 LCJS API에 맞게 필요 시 구현
}

// Reactive: chartData가 바뀌면 재렌더링
watch(
  () => props,
  () => {
    if (!chart) return
    chart.dispose()
    createChart()
  },
  { deep: true }
)

onMounted(() => createChart())
onBeforeUnmount(() => { if (lcInstance) lcInstance.dispose() })
</script>

<style scoped>
.fill {
  height: 100%;
  width: 100%;
}
</style>
