<template>
  <div :id="chartId" class="fill"></div>
</template>

<script>
import { emptyFill } from "@lightningchart/lcjs";
import lc from "@/lib/lcjs"

export default {
  name: "ScatterChart",
  props: ["points"],
  data() {
    // Add the chart to the data in a way that Vue will not attach it's observers to it.
    // If the chart variable would be added in the return object, Vue would attach the observers and
    // every time LightningChart JS made a change to any of it's internal variables, vue would try to observe the change and update.
    // Observing would slow down the chart a lot.
    this.chart = null;
    return {
      chartId: null,
    };
  },
  methods: {
    createChart() {
      // Create chartXY
      this.lc = lc;

      this.chart = this.lc.ChartXY({ container: `${this.chartId}` });
      // Set chart title
      this.chart.setTitle("Scatter Chart");

      const scatterSeries = this.chart.addPointSeries()
      // scatterSeries.setPointFillStyle(new SolidFill({ color: ColorRGBA(255, 0, 0) }))
      // scatterSeries.setPointStrokeStyle(new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorRGBA(255, 0, 0) }) }))
      // scatterSeries.setPointShape(PointShape.Star)

      // 5 pixels point size
      scatterSeries.setPointSize(5)

      // Rotate points by 45 degrees
      scatterSeries.setPointRotation(45)

      // Example, 2px thick black stroke
      // scatterSeries.setPointStrokeStyle(new SolidLine({
      //     thickness: 1, 
      //     fillStyle: new SolidFill({ color: ColorRGBA(0, 0, 0) }) 
      // }))
      scatterSeries.appendJSON(this.points);
    },
  },
  beforeMount() {
    // Generate random ID to us as the containerId for the chart and the target div id
    this.chartId = Math.trunc(Math.random() * 1000000);
  },
  mounted() {
    // Chart can only be created when the component has mounted the DOM because
    // the chart needs the element with specified containerId to exist in the DOM
    this.createChart();
  },
  beforeUnmount() {
    // "dispose" should be called when the component is unmounted to free all the resources used by the chart
    this.lc.dispose();
  },
};
</script>
<style scoped>
.fill {
  height: 100%;
}
</style>