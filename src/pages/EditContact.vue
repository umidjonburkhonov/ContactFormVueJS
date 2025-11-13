<template>
  <div class="page">
    <div class="card">
      <h2><i class="fa-solid fa-pen-to-square"></i> Редактирование контакта</h2>

      <form v-if="loaded" @submit.prevent="handleUpdate" class="form">
        <div class="form-group">
          <label>Имя</label>
          <input
            v-model="name"
            placeholder="Введите имя"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Введите email"
            required
          />
        </div>

        <div class="form-group">
          <label>Телефон</label>
          <input
            v-model="phone"
            placeholder="+7 (999) 123-45-67"
            required
          />
        </div>

        <button type="submit" class="btn">
          <i class="fa-solid fa-floppy-disk"></i> Сохранить изменения
        </button>
      </form>

      <div v-else class="loading">
        <i class="fa-solid fa-spinner fa-spin"></i> Загрузка данных...
      </div>

      <button @click="router.push('/')" class="back-btn">
        <i class="fa-solid fa-arrow-left"></i> Назад к списку
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContactsStore } from "../store/contacts";

const store = useContactsStore();
const route = useRoute();
const router = useRouter();

const name = ref("");
const email = ref("");
const phone = ref("");
const loaded = ref(false);

onMounted(async () => {
  const contact = await store.getContactById(route.params.id);
  name.value = contact.name;
  email.value = contact.email;
  phone.value = contact.phone;
  loaded.value = true;
});

async function handleUpdate() {
  await store.updateContact(route.params.id, {
    name: name.value,
    email: email.value,
    phone: phone.value,
  });
  router.push("/");
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
  padding: 26px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: 0.25s ease;
}

.card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

h2 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 22px;
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
  gap: 16px;
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
  font-size: 14px;
  transition: 0.2s;
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

.loading {
  text-align: center;
  color: #555;
  font-size: 15px;
  padding: 10px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: 0.25s;
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
