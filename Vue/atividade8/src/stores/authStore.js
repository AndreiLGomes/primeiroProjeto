// src/stores/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    usuario: JSON.parse(localStorage.getItem('usuario')) || null
  }),

  actions: {
    login(token, usuario) {
      this.token = token;
      this.usuario = usuario;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    },

    logout() {
      this.token = '';
      this.usuario = null;
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUsuario: (state) => state.usuario
  }
});
