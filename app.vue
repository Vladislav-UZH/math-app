<script lang="ts" setup>
const DATA_FLAT = [
  12, 19, 11, 2, 10, -2, 5, 13, 0, 5, 1, 1, 17, 12, 1.5, 17, 0, 10, 15, -2, 5,
  2, 3, 6, 3, -1, 12, 11, 9, 22, 4, 0, 7, 3, 8, 21, 17, 12, 5, 8,
];
const rows = ref();
function getRepeatFrequency(data: number[]) {
  const copy = [...data];
  copy.sort((a, b) => a - b);

  console.log(copy);
  const repeats: Record<number, number> = {};

  for (const item of copy) {
    if (repeats[item]) {
      repeats[item]++;
    } else {
      repeats[item] = 1;
    }
  }
  const res = Object.entries(repeats).map(([key, value]) => ({
    value: Number(key),
    count: value,
  }));
  rows.value = res;
  return res;
}
</script>

<template>
  <div class="app-container">
    <header class="header-container">MathApp</header>
    <main class="main-container">
      <Statistics></Statistics>

      <!-- <div>
        <article v-if="false">
          <p>
            задано набір емпіричних даних (Набір кількісної інформації або
            текстовий масив) Потрібно:
          </p>
          <ol>
            <li>
              Систематизувати інформацію - скласти статичстичні розподіли
              (побудувати 4 таблиці)
            </li>
            <li>
              Скласти графічні характеристики. Полігон частот Полігон відносних
              частот
            </li>
            <li>Знайти емпіричну функцію розподілу та побудувати її графік</li>
            <li>
              Перейти до інтервальних розподілів. До інтервалього розоділу
              побудувати гістограму. Обчислити числоав характеристики. Мода,
              Медіана, СерЗнач, Дисперсія, СерКвадВідх
            </li>
          </ol>
        </article>

        <DataTable :value="rows">
          <Column header="Value" field="value" />
          <Column header="Count" field="count" />
        </DataTable>
      </div> -->
    </main>
    <NuxtPwaManifest />
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
}

.header-container {
  height: 50px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.main-container {
  margin-top: 32px;
  display: flex;
  gap: 12px;
}
</style>
