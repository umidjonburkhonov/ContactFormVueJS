<template>
  <div class="page">
    <div class="container">
      <div class="top-bar">
        <h1>Список контактов</h1>
        <button class="add-btn" @click="$router.push('/add')">
          <i class="fa-solid fa-user-plus"></i>
          <span>Добавить</span>
        </button>
      </div>

      <input
        type="text"
        v-model="search"
        placeholder="Поиск по имени..."
        class="search"
      />

      <div v-if="store.loading" class="loading">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>Загрузка...</p>
      </div>

      <div v-else-if="filteredContacts.length === 0" class="empty">
        <i class="fa-solid fa-circle-info"></i>
        <p>Контакты не найдены</p>
      </div>

      <ul v-else class="list">
        <li v-for="contact in filteredContacts" :key="contact.id" class="card">
          <div class="info">
            <h3>{{ contact.name }}</h3>
            <p><i class="fa-solid fa-phone"></i> {{ contact.phone }}</p>
            <p><i class="fa-solid fa-envelope"></i> {{ contact.email }}</p>
          </div>

          <div class="actions">
            <button
              class="edit"
              title="Редактировать"
              @click="$router.push('/edit/' + contact.id)"
            >
              <i class="fa-solid fa-pen"></i>
            </button>
            <button
              class="delete"
              title="Удалить"
              @click="confirmDelete(contact)"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>

  
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal">
        <h3>
          <i class="fa-solid fa-triangle-exclamation"></i>
          Удалить контакт?
        </h3>
        <p>
          Вы действительно хотите удалить контакт
          <b>{{ selectedContact?.name }}</b>?
        </p>

        <div class="modal-actions">
          <button class="cancel" @click="closeModal">Отмена</button>
          <button class="confirm" @click="deleteContact">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useContactsStore } from "../store/contacts";

const store = useContactsStore();
const search = ref("");


const showModal = ref(false);
const selectedContact = ref(null);

function confirmDelete(contact) {
  selectedContact.value = contact;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedContact.value = null;
}

async function deleteContact() {
  await store.deleteContact(selectedContact.value.id);
  closeModal();
}

onMounted(() => store.fetchContacts());

const filteredContacts = computed(() =>
  store.contacts.filter((c) =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<style scoped>
.page {
  min-height: 80vh;
  background: #f6f8fa;
  display: flex;
  justify-content: center;
  padding: 30px 12px;
}

.container {
  background: #fff;
  width: 100%;
  max-width: 650px;
  padding: 25px 28px;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.top-bar h1 {
  color: #1f2937;
  font-size: 22px;
  font-weight: 600;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #10b981;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.25s;
}

.add-btn:hover {
  background: #059669;
}

.search {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.2s;
}

.search:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.loading,
.empty {
  text-align: center;
  color: #555;
  padding: 20px;
  font-size: 15px;
}

.loading i,
.empty i {
  color: #10b981;
  margin-bottom: 6px;
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.card {
  background: #f9fafb;
  border: 1px solid #e0e7e0;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: 0.25s;
}

.card:hover {
  background: #f1fdf4;
  border-color: #a7e3b6;
  transform: translateY(-2px);
}

.info h3 {
  margin: 0 0 4px 0;
  color: #111;
  font-size: 16px;
}

.info p {
  margin: 3px 0;
  font-size: 13.5px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 6px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.actions button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 17px;
  transition: 0.25s;
}

.actions .edit {
  color: #10b981;
}

.actions .delete {
  color: #ef4444;
}

.actions button:hover {
  transform: scale(1.2);
}

/* MODAL STIL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: #fff;
  padding: 26px 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.modal h3 {
  color: #dc2626;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.modal p {
  color: #333;
  margin-bottom: 20px;
  font-size: 15px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.modal-actions button {
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  font-size: 14px;
}

.modal-actions .cancel {
  background: #e5e7eb;
  color: #333;
}

.modal-actions .cancel:hover {
  background: #d1d5db;
}

.modal-actions .confirm {
  background: #ef4444;
  color: #fff;
}

.modal-actions .confirm:hover {
  background: #dc2626;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .container {
    padding: 20px 18px;
  }

  .card {
    flex-direction: column;
    gap: 10px;
  }

  .actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
