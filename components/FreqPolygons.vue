<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { useDataStore } from "@/stores/data";
import { computed } from "vue";
import { buildTable, polygonData } from "@/utils/stats";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const rows = computed(() => buildTable(useDataStore().values));
const data = computed(() => polygonData(rows.value));

const commonOpts = {
  responsive: true,
  scales: { y: { beginAtZero: true } }, // вісь Y від 0
};
</script>

<template>
  <div v-if="rows.length" class="mt-8 grid sm:grid-cols-2 gap-6">
    <Line
      :options="commonOpts"
      :data="{
        labels: data.labels,
        datasets: [{ label: 'nᵢ', data: data.abs, fill: false, tension: 0.1 }],
      }"
    />
    <p>#2</p>
    <Line
      :options="commonOpts"
      :data="{
        labels: data.labels,
        datasets: [{ label: 'fᵢ', data: data.rel, fill: false, tension: 0.1 }],
      }"
    />
  </div>
</template>
