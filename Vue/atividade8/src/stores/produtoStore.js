// src/stores/produtoStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    carregando: false,
    erro: ''
  }),

  actions: {
    async buscarProdutos() {
      this.carregando = true;
      this.erro = '';

      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.produtos = response.data;
      } catch (e) {
        this.erro = 'Erro ao buscar produtos.';
        console.error(e);
      } finally {
        this.carregando = false;
      }
    }
  },

  getters: {
    totalProdutos: (state) => state.produtos.length
  }
});
