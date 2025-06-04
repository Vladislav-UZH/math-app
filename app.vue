<script lang="ts" setup>
const userData = ref<number[]>([]);
const currentNumber = ref<number | null>(null);
function addNumber() {
  if (!currentNumber.value) {
    alert("Please enter a number");
    return;
  }
  userData.value.push(Number(currentNumber.value));
  currentNumber.value = null;
}

function calculate() {}
</script>

<template>
  <div class="app-container">
    <header class="header-container">MathApp</header>

    <div>
      <h2>Enter your number</h2>
      <p>Your elems list: {{ userData }}</p>
      <div>
        <InputText
          placeholder="Add your number to list"
          type="number"
          v-model="currentNumber"
        />
        <Button label="ADD" @click="addNumber" />
        <Button label="Calculate" @click="calculate" />
      </div>
    </div>

    <main class="main-container">
      <Statistics :data="userData"></Statistics>

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
