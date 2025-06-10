<script setup lang="ts">
import Papa from "papaparse";
import { useDataStore } from "@/stores/data";
const store = useDataStore();

function parseRaw(raw: string) {
  const arr = raw
    .split(/[\s,;]+/)
    .map(Number)
    .filter((v) => !isNaN(v));
  store.set(arr);
}

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  Papa.parse<number>(file, {
    complete: (r) => parseRaw(r.data.flat().join(" ")),
  });
}
</script>

<template>
  <div class="space-y-4">
    <input type="file" accept=".csv,.txt" @change="onFile" />
    <textarea
      rows="4"
      class="w-full border p-2"
      placeholder="1 2 3 ..."
      @input="parseRaw(($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>
