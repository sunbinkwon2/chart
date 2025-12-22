<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LightningChart from '@/components/LightningChart.vue'
import type { ChartData } from '@/types/chart.type'
import { fetchChartData, fetchChartImage } from '@/api/chart.api'

const chartImageUrl = ref<string | null>(null)
const chartData = ref<ChartData | null>(null)

onMounted(async () => {
  try {
    // 1️⃣ 서버에서 차트 이미지 먼저 가져오기
    const image = await fetchChartImage(1)
    chartImageUrl.value = image.dataUrl

    // 2️⃣ 라이브 차트 데이터 가져오기
    const data = await fetchChartData(1)
    chartData.value = data

    // 이미지 숨기고 라이브 차트 보여주기
    chartImageUrl.value = null
  } catch (err) {
    console.error('Failed to fetch chart', err)
  }
})
</script>

<template>
  <div>
    <h1>{{ chartData?.meta.title || 'Loading Chart...' }}</h1>

    <!-- 이미지와 차트 전환용 Transition -->
    <Transition name="fade" mode="out-in">
      <!-- 서버 이미지 -->
      <img
        v-if="chartImageUrl"
        :key="'image'"
        :src="chartImageUrl"
        alt="Loading Chart"
      />

      <!-- 라이브 차트 -->
      <LightningChart
        v-else-if="chartData"
        :key="'chart'"
        :points="chartData.points"
        :bands="chartData.bands"
        :options="chartData.options"
        :size="chartData.size"
      />
    </Transition>
  </div>
</template>

<style scoped>
/* 페이드 인/아웃 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
