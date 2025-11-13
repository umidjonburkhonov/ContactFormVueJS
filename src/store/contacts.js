import { defineStore } from "pinia";
import { api } from "../services/api";

export const useContactsStore = defineStore("contacts", {
    state: () => ({
        contacts: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchContacts() {
            this.loading = true;
            try {
                const res = await api.get("/contacts");
                this.contacts = res.data;
            } catch (e) {
                this.error = "Failed to load contacts";
            } finally {
                this.loading = false;
            }
        },
        async addContact(contact) {
            try {
                await api.post("/contacts", contact);
                await this.fetchContacts();
            } catch {
                this.error = "Failed to add contact";
            }
        },
        async deleteContact(id) {
            try {
                await api.delete(`/contacts/${id}`);
                this.contacts = this.contacts.filter(c => c.id !== id);
            } catch {
                this.error = "Failed to delete contact";
            }
        },
        async updateContact(id, data) {
            try {
                await api.put(`/contacts/${id}`, data);
                await this.fetchContacts();
            } catch {
                this.error = "Failed to update contact";
            }
        },
        async getContactById(id) {
            const res = await api.get(`/contacts/${id}`);
            return res.data;
        }
    }
});
