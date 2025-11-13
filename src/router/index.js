import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AddContact from "../pages/AddContact.vue";
import EditContact from "../pages/EditContact.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/add", component: AddContact },
    { path: "/edit/:id", component: EditContact }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
