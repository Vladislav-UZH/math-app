<script lang="ts" setup>
import { ref } from "vue";
import Statistics from "~/components/Statistics.vue"; // ваше розташування компонента

// Масив, куди будемо додавати числа з інпута:
const userData = ref<number[]>([]);
// Поточне введіене користувачем число:
const currentNumber = ref<number | null>(null);

// Масив, який передамо до <Statistics>
// (нащадок userData, але із затримкою — лише після натискання Calculate)
const statsData = ref<number[]>([]);

function addNumber() {
  if (currentNumber.value === null || isNaN(currentNumber.value)) {
    alert("Please enter a valid number");
    return;
  }
  userData.value.push(Number(currentNumber.value));
  currentNumber.value = null;
}

function calculate() {
  // Копіюємо всі числа із userData у statsData,
  // щоб <Statistics> почав перерахунок саме зараз.
  statsData.value = [...userData.value];
}
</script>

<template>
  <div class="app-container">
    <header class="header-container">MathApp</header>

    <section class="input-section">
      <h2>Enter your numbers</h2>
      <p>Your current list: {{ userData }}</p>
      <div class="input-controls">
        <InputText
          v-model="currentNumber"
          type="number"
          placeholder="Add your number to list"
        />
        <Button label="ADD" @click="addNumber" />
        <Button label="Calculate" @click="calculate" />
      </div>
    </section>

    <main class="main-container">
      <!-- <Statistics> відображає лише ті дані, 
           що лежать в statsData. Спочатку statsData = [], 
           тому жодного виклику обчислень не буде. -->
      <Statistics :data="statsData" />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  padding: 12px;
}

.header-container {
  height: 50px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.input-section {
  margin: 16px 0;
}

.input-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.main-container {
  margin-top: 32px;
}
</style>
