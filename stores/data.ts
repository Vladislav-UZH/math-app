import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({ values: [] as number[] }),
  actions: {
    set(values: number[]) {
      this.values = values;
    },
  },
});
