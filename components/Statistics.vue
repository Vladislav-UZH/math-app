<script setup lang="ts">
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Chart from "primevue/chart";

const props = withDefaults(defineProps<{ data?: number[] }>(), {
  data: () => [
    12, 19, 11, 2, 10, -2, 5, 13, 0, 5, 1, 1, 17, 12, 1.5, 17, 0, 10, 15, -2, 5,
    2, 3, 6, 3, -1, 12, 11, 9, 22, 4, 0, 7, 3, 8, 21, 17, 12, 5, 8,
  ],
});
const data = computed(() => props.data);

const math = useMath();
const absFreq = ref(math.getAbsoluteFreq(data.value));
const relFreq = ref(math.getRelativeFreq(data.value));
const cumFreq = ref(math.getCumulativeFreq(data.value));
const cumRelFreq = ref(math.getCumulativeRelFreq(data.value));

const polygonData = ref(math.getPolygonData(data.value));
const relativePolygonData = ref(math.getRelativePolygonData(data.value));
const ecdfChart = ref({
  labels: math.getECDF(data.value).map((p) => p.x.toString()),
  datasets: [
    {
      label: "ECDF",
      data: math.getECDF(data.value).map((p) => p.y),
      stepped: true,
    },
  ],
});
const histData = ref(math.getHistogramData(data.value));

const mean = math.getMean(data.value);
const median = math.getMedian(data.value);
const mode = math.getMode(data.value);
const variance = math.getVariance(data.value);
const stdDev = math.getStdDev(data.value);
</script>
<template>
  <div>
    <h2>Статистичні розподіли</h2>

    <div class="flex-group">
      <DataTable :value="absFreq" style="border-right: 1px solid black">
        <Column field="value" header="Значення" />
        <Column field="frequency" header="Абс. частота" />
      </DataTable>

      <DataTable
        :value="relFreq"
        class="mt-4"
        style="border-right: 1px solid black"
      >
        <Column field="value" header="Значення" />
        <Column field="relFreq" header="Відн. частота" />
      </DataTable>

      <DataTable
        :value="cumFreq"
        class="mt-4"
        style="border-right: 1px solid black"
      >
        <Column field="value" header="Значення" />
        <Column field="cumFreq" header="Накоп. частота" />
      </DataTable>

      <DataTable
        :value="cumRelFreq"
        class="mt-4"
        style="border-right: 1px solid black"
      >
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
</template>

<style scoped>
.flex-group {
  display: flex;
  gap: 12px;
}

.charts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}
</style>
