<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  type ChartData,
  type ChartDataset,
} from "chart.js";
import { computed } from "vue";
import { useDataStore } from "@/stores/data";
import { buildTable, cdfPoints, cdfExpr, type XY } from "@/utils/stats";

/* --- реєстрація Chart.js елементів --- */
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

/* --- плагін зі стрілками уліво --- */
Chart.register({
  id: "leftArrows",
  afterDatasetDraw(chart, args) {
    const { ctx } = chart;
    const pts = args.meta.data;
    ctx.save();
    ctx.fillStyle = "#000";
    pts.forEach((pt, i) => {
      if (i === 0) return;
      const { x, y } = pt.getProps(["x", "y"], true);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 6, y - 3);
      ctx.lineTo(x + 6, y + 3);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
  },
});

/* --- дані --- */
const rows = computed(() => buildTable(useDataStore().values));
const expr = computed(() => cdfExpr(rows.value));
const pts = computed(() => cdfPoints(rows.value));

/* --- ChartData з точним дженеріком --- */
const chartData = computed<ChartData<"line", XY[], number>>(() => ({
  datasets: [
    {
      label: "F̂(x)",
      data: pts.value,
      parsing: { xAxisKey: "x", yAxisKey: "y" },
      stepped: "before" as const,
      fill: false,
      borderWidth: 1,
    } as ChartDataset<"line", XY[]>,
  ],
}));

/* --- опції --- */
import type { ChartOptions } from "chart.js";

const opts: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: { type: "linear" as const, beginAtZero: false },
    y: { type: "linear" as const, beginAtZero: true, max: 1 },
  },
};
</script>

<template>
  <div v-if="rows.length" class="mt-8 space-y-4">
    <pre class="bg-gray-100 p-3 text-sm">{{ expr }}</pre>
    <Line :data="chartData" :options="opts" />
  </div>
</template>
