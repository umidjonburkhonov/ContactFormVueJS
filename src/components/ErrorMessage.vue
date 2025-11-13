<template>
  <div class="error">
    ⚠️ {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String
});
</script>

<style scoped>
.error {
  color: #fff;
  background-color: #e74c3c;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin: 10px 0;
}
</style>
