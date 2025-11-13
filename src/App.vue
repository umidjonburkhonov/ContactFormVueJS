<template>
  <div class="app">

    <header class="header">
      <div class="logo-box">
        <i class="fa-solid fa-address-book logo-icon"></i>
        <h1 class="logo-text">Контакты CRM</h1>
      </div>

      <nav class="nav">
        <router-link to="/" class="nav-link">
          <i class="fa-solid fa-list"></i>
          <span>Главная</span>
        </router-link>

        <router-link to="/add" class="nav-link">
          <i class="fa-solid fa-user-plus"></i>
          <span>Добавить контакт</span>
        </router-link>
      </nav>
    </header>


    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useContactsStore } from "./store/contacts";

const store = useContactsStore();
onMounted(() => store.fetchContacts());
</script>

<style scoped>

.app {
  font-family: "Inter", "Segoe UI", sans-serif;
  background: #f6f8fa;
  color: #222;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


.header {
  background: #1f2937;
  color: #fff;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.logo-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  color: #10b981;
  font-size: 22px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.4px;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #d1d5db;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 500;
  transition: 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-link.router-link-active {
  background: #10b981;
  color: #fff;
}


.main {
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 30px auto;
  padding: 0 20px;
}


@media (max-width: 700px) {
  .header {
    flex-direction: column;
    gap: 12px;
    padding: 14px 20px;
  }

  .nav {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>


