<script setup lang="ts">
import { computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Chart from "primevue/chart";

interface StatObj {
  value: number;
  frequency?: number;
  relFreq?: number;
  cumFreq?: number;
  cumRelFreq?: number;
}

const props = withDefaults(defineProps<{ data?: number[] }>(), {
  data: () => [] as number[],
});

const math = useMath();

// Усі розрахунки покладені в computed, тому при зміні props.data
// все автоматично перераховується.

const absFreq = computed<StatObj[]>(() => {
  return math.getAbsoluteFreq(props.data!);
});

const relFreq = computed<StatObj[]>(() => {
  // повертає масив об'єктів { value, relFreq }
  return math.getRelativeFreq(props.data!);
});

const cumFreq = computed<StatObj[]>(() => {
  return math.getCumulativeFreq(props.data!);
});

const cumRelFreq = computed<StatObj[]>(() => {
  return math.getCumulativeRelFreq(props.data!);
});

// Дані для полігону (частоти)
const polygonData = computed(() => {
  return math.getPolygonData(props.data!);
});

// Дані для полігону (відносні частоти)
const relativePolygonData = computed(() => {
  return math.getRelativePolygonData(props.data!);
});

// Дані для ECDF
const ecdfPoints = computed(() => math.getECDF(props.data!));
const ecdfChart = computed(() => ({
  labels: ecdfPoints.value.map((p) => p.x.toString()),
  datasets: [
    {
      label: "ECDF",
      data: ecdfPoints.value.map((p) => p.y),
      stepped: true,
    },
  ],
}));

// Дані для гістограми
const histData = computed(() => math.getHistogramData(props.data!));

// Числові характеристики
const mean = computed(() => math.getMean(props.data!));
const median = computed(() => math.getMedian(props.data!));
const mode = computed(() => math.getMode(props.data!));
const variance = computed(() => math.getVariance(props.data!));
const stdDev = computed(() => math.getStdDev(props.data!));
</script>
<template>
  <div v-if="data.length > 0">
    <h2>Статистичні розподіли</h2>

    <div class="flex-group">
      <DataTable :value="absFreq" style="border-right: 1px solid #ccc">
        <Column field="value" header="Значення" />
        <Column field="frequency" header="Абс. частота" />
      </DataTable>

      <DataTable :value="relFreq" style="border-right: 1px solid #ccc">
        <Column field="value" header="Значення" />
        <Column field="relFreq" header="Відн. частота" />
      </DataTable>

      <DataTable :value="cumFreq" style="border-right: 1px solid #ccc">
        <Column field="value" header="Значення" />
        <Column field="cumFreq" header="Накоп. частота" />
      </DataTable>

      <DataTable :value="cumRelFreq">
        <Column field="value" header="Значення" />
        <Column field="cumRelFreq" header="Накоп. відн. частота" />
      </DataTable>
    </div>

    <h2 class="mt-6">Графіки</h2>
    <div class="charts">
      <Chart type="line" :data="polygonData" class="my-4" />
      <Chart type="line" :data="relativePolygonData" class="my-4" />
      <Chart
        type="line"
        :data="ecdfChart"
        class="my-4"
        :options="{ stepped: true }"
      />
      <Chart type="bar" :data="histData" class="my-4" />
    </div>

    <h2 class="mt-6">Числові характеристики</h2>
    <ul>
      <li>Мода: {{ mode.join(", ") }}</li>
      <li>Медіана: {{ median }}</li>
      <li>Середнє: {{ mean.toFixed(3) }}</li>
      <li>Дисперсія: {{ variance.toFixed(3) }}</li>
      <li>Сер.квадр. відхилення: {{ stdDev.toFixed(3) }}</li>
    </ul>
  </div>

  <div v-else>
    <p>
      Введіть хоча б одне число та натисніть «Calculate», щоб побачити
      результати.
    </p>
  </div>
</template>

<style scoped>
.flex-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.charts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}
</style>
