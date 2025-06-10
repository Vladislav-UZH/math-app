<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

import { computed, ref } from "vue";
import { useDataStore } from "@/stores/data";
import { intervalDist, kSturges } from "@/utils/stats";

const store = useDataStore();
const k = ref(0); // 0 ⇒ формула Стерджеса
const mergeZero = ref(false);

const rows = computed(() => {
  const n = store.values.length;
  const kk = k.value > 0 ? k.value : kSturges(n);
  return intervalDist(store.values, kk, mergeZero.value);
});
const chartData = computed(() => ({
  labels: rows.value.map((r) => `[${r.a.toFixed(1)}; ${r.b.toFixed(1)})`),
  datasets: [{ label: "nᵢ / h", data: rows.value.map((r) => r.dens) }],
}));
const opts = { responsive: true, scales: { y: { beginAtZero: true } } };
</script>

<template>
  <div v-if="store.values.length" class="mt-8 space-y-4">
    <div class="flex items-center gap-4 text-sm">
      k:
      <input type="number" min="1" class="border p-1 w-16" v-model.number="k" />
      <label><input type="checkbox" v-model="mergeZero" /> злити порожні</label>
      <span v-if="k === 0">(Стерджес ⇒ {{ rows.length }} інтервалів)</span>
    </div>

    <Bar :data="chartData" :options="opts" />
  </div>
</template>
