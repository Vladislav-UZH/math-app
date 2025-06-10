<script setup lang="ts">
import { computed } from "vue";
import { useDataStore } from "@/stores/data";
import { numericStats } from "@/utils/stats";

const stats = computed(() => numericStats(useDataStore().values));
</script>

<template>
  <div v-if="stats" class="mt-8">
    <table class="border text-sm">
      <tbody>
        <tr>
          <th class="px-2">Мода</th>
          <td class="px-4">{{ stats.modes.join(", ") }}</td>
        </tr>
        <tr>
          <th class="px-2">Медіана</th>
          <td class="px-4">{{ stats.median.toFixed(3) }}</td>
        </tr>
        <tr>
          <th class="px-2">Середнє</th>
          <td class="px-4">{{ stats.mean.toFixed(3) }}</td>
        </tr>
        <tr>
          <th class="px-2">Дисперсія</th>
          <td class="px-4">{{ stats.variance.toFixed(3) }}</td>
        </tr>
        <tr>
          <th class="px-2">σ (середнє квадр. відх.)</th>
          <td class="px-4">{{ stats.stdev.toFixed(3) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
