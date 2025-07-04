<template>
  <div class="container mt-4">
    <h3>🛒 Lista de Produtos</h3>

    <button class="btn btn-success mb-3" @click="produtoStore.buscarProdutos">
      🔄 Buscar Produtos
    </button>

    <div v-if="produtoStore.carregando" class="alert alert-info">Carregando...</div>
    <div v-if="produtoStore.erro" class="alert alert-danger">{{ produtoStore.erro }}</div>

    <ul v-if="produtoStore.produtos.length">
      <li v-for="produto in produtoStore.produtos" :key="produto.id" class="mb-2">
        <strong>{{ produto.title }}</strong> — R$ {{ produto.price }}
        <button class="btn btn-sm btn-primary ms-2" @click="adicionar(produto)">🛒</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProdutoStore } from '@/stores/produtoStore';
import { useCarrinhoStore } from '@/stores/carrinhoStore';

const produtoStore = useProdutoStore();
const carrinhoStore = useCarrinhoStore();

function adicionar(produto) {
  carrinhoStore.adicionarAoCarrinho(produto);
}
</script>
