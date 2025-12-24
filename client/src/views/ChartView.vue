<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LightningChart from '@/components/LightningChart.vue'
import type { ChartData } from '@/types/chart.type'
import { fetchChartData, fetchChartImage } from '@/api/chart.api'
import { useRoute } from 'vue-router';

const route = useRoute();
const chartId = route.params.id as string; // route param 읽기

const chartImage = ref<string | null>(null)
const chartData = ref<ChartData | null>(null)

onMounted(async () => {
  try {
    // 1️⃣ 서버에서 차트 이미지 먼저 가져오기
    const image = await fetchChartImage(chartId)
    chartImage.value = image.dataUrl

    // 2️⃣ 라이브 차트 데이터 가져오기
    const data = await fetchChartData(chartId)
    chartData.value = data
    console.log(chartData.value)

    // 이미지 숨기고 라이브 차트 보여주기
    // chartImage.value = null
  } catch (err) {
    console.error('Failed to fetch chart', err)
  }
})
</script>

<template>
  <div class="chart-wrapper">
    <!-- <img
      :key="'image'"
      :src="chartImage"
      alt="Loading Chart"
    /> -->
    <LightningChart
      v-if="chartData"
      :key="'chart'"
      :chartData="chartData"
      :meta="chartData.meta"
      :points="chartData.points"
      :bands="chartData.bands"
      :options="chartData.options"
      :size="chartData.size"
      :type="chartData.type"
    />
    <!-- 이미지와 차트 전환용 Transition -->
    <!-- <Transition name="fade" mode="out-in">
      <img
        v-if="chartImage"
        :key="'image'"
        :src="chartImage"
        alt="Loading Chart"
      />

      <LightningChart
        v-else-if="chartData"
        :key="'chart'"
        :chartData="chartData"
        :meta="chartData.meta"
        :points="chartData.points"
        :bands="chartData.bands"
        :options="chartData.options"
        :size="chartData.size"
        :type="chartData.type"
      />
    </Transition> -->
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
.chart-wrapper {
  width: 100%;
  height: 100vh; /* 또는 100vh */
}
</style>
