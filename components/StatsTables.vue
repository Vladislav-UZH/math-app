<script setup lang="ts">
import { computed } from "vue";
import { useDataStore } from "@/stores/data";
import { buildTableWithBounds } from "@/utils/stats";

/* якщо «рамка» не потрібна — заміни на buildTable(...) */
const rows = computed(() => buildTableWithBounds(useDataStore().values));
</script>

<template>
  <div
    v-if="rows.length"
    class="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm"
  >
    <div>
      <p>Частоти</p>
      <table class="border w-full">
        <thead>
          <tr>
            <th>Xᵢ</th>
            <th>nᵢ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="'n' + r.x">
            <td>{{ r.x }}</td>
            <td>{{ r.n }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <p>Накопичувана частота</p>
      <table class="border w-full">
        <thead>
          <tr>
            <th>Xᵢ</th>
            <th>fᵢ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="'f' + r.x">
            <td>{{ r.x }}</td>
            <td>{{ r.f.toFixed(3) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <p>Відносна частота</p>
      <table class="border w-full">
        <thead>
          <tr>
            <th>Xᵢ</th>
            <th>Nᵢ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="'N' + r.x">
            <td>{{ r.x }}</td>
            <td>{{ r.N }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <p>Відносна накопичувана частота</p>
      <table class="border w-full">
        <thead>
          <tr>
            <th>Xᵢ</th>
            <th>Fᵢ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="'F' + r.x">
            <td>{{ r.x }}</td>
            <td>{{ r.F.toFixed(3) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
