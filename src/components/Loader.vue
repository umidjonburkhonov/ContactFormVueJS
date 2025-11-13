<template>
  <div class="loader">
    <div class="spinner"></div>
    <p>Загрузка...</p>
  </div>
</template>

<script setup></script>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.spinner {
  border: 4px solid #ccc;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
