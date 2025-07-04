// src/stores/carrinhoStore.js
import { defineStore } from 'pinia';

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: [] // Cada item será: { produto, quantidade }
  }),

  actions: {
    adicionarAoCarrinho(produto) {
      const itemExistente = this.itens.find((item) => item.produto.id === produto.id);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        this.itens.push({ produto, quantidade: 1 });
      }
    },

    removerDoCarrinho(produtoId) {
      this.itens = this.itens.filter((item) => item.produto.id !== produtoId);
    }
  },

  getters: {
    totalItens: (state) => state.itens.reduce((acc, item) => acc + item.quantidade, 0),
    valorTotal: (state) =>
      state.itens.reduce((acc, item) => acc + item.quantidade * item.produto.price, 0).toFixed(2)
  }
});
