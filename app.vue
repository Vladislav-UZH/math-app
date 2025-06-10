<script lang="ts" setup>
import { ref } from "vue";

const userData = ref<number[]>([]);
const currentNumber = ref<number | null>(null);
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
  statsData.value = [...userData.value];
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result as string;
    const tokens = text.split(/[\s,]+/);
    tokens.forEach((token) => {
      const num = parseFloat(token);
      if (!isNaN(num)) {
        userData.value.push(num);
      }
    });
    input.value = "";
  };
  reader.readAsText(file);
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

      <div class="file-upload">
        <label for="fileInput">Load from .txt:</label>
        <input
          id="fileInput"
          type="file"
          accept=".txt"
          @change="onFileChange"
        />
      </div>
    </section>

    <main class="main-container">
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
  margin-bottom: 12px;
}

.file-upload {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-container {
  margin-top: 32px;
}
</style>
