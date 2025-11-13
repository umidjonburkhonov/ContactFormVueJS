<template>
  <div class="page">
    <div class="card">
      <h2><i class="fa-solid fa-user-plus"></i> Добавить новый контакт</h2>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label>Имя</label>
          <input
            v-model="name"
            placeholder="Например: Умедчон Бурхонов"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="u.burkhonov99@gmail.com"
            required
          />
        </div>

        <div class="form-group">
          <label>Телефон</label>
          <input
            v-model="phone"
            placeholder="+992 92 666 22 44"
            required
          />
        </div>

        <button
          type="submit"
          class="btn"
          :disabled="loading"
        >
          <i
            v-if="!loading"
            class="fa-solid fa-floppy-disk"
          ></i>
          <i
            v-else
            class="fa-solid fa-spinner fa-spin"
          ></i>
          <span v-if="!loading">Сохранить</span>
          <span v-else>Сохраняется...</span>
        </button>
      </form>

      <button
        @click="router.push('/')"
        class="back-btn"
      >
        <i class="fa-solid fa-arrow-left"></i>
        Назад к списку
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useRouter } from "vue-router";
import { useContactsStore } from "../store/contacts";

const store = useContactsStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const phone = ref("");
const loading = ref(false);

// Toast helper
function showToast(text, color = "red") {
  Toastify({
    text,
    duration: 3500,
    gravity: "top",
    position: "right",
    style: {
      background: color === "green" ? "#10b981" : "#ef4444",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  }).showToast();
}


function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.(com|ru|de|net|org|tj)$/i;
  return pattern.test(email);
}

async function handleSubmit() {
  const phoneDigits = phone.value.replace(/\D/g, ""); 


  if (name.value.trim().length < 4) {
    showToast("Имя должно содержать не менее 4 букв");
    return;
  }

  if (!phone.value.startsWith("+992")) {
    showToast("Телефон должен начинаться с +992");
    return;
  }

  if (phoneDigits.length !== 12) {
    showToast("Номер телефона должен содержать не менее 12 цифр");
    return;
  }

  if (!isValidEmail(email.value)) {
    showToast("Введите корректный Email (например: example@mail.com)");
    return;
  }

  loading.value = true;

  try {
    await store.addContact({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
    });
    showToast("Контакт успешно добавлен!", "green");
    router.push("/");
  } catch (e) {
    showToast("Ошибка при добавлении контакта");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: #f6f8fa;
  padding: 20px;
}

.card {
  background: #fff;
  width: 100%;
  max-width: 400px;
  padding: 30px 35px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 14px;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;
  font-size: 14px;
}

input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.btn {
  background: #10b981;
  color: #fff;
  font-weight: 600;
  border: none;
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:hover {
  background: #059669;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-btn {
  margin-top: 18px;
  width: 100%;
  background: none;
  color: #10b981;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.back-btn:hover {
  color: #059669;
}

@media (max-width: 480px) {
  .card {
    padding: 20px;
    max-width: 90%;
  }

  .btn {
    font-size: 14px;
  }
}
</style>
