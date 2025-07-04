<template>
  <div class="lista">
    <h3>Lista de Itens</h3>
    <ul>
      <li v-for="item in itens" :key="item.id">
        {{ item.nome }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListaItens',
  data() {
    return {
      itens: [
        { id: 1, nome: 'Item A' },
        { id: 2, nome: 'Item B' },
        { id: 3, nome: 'Item C' }
      ]
    };
  }
};
</script>

<style scoped>
.lista {
  margin: 20px 0;
  padding: 10px;
  border: 1px dashed #888;
  background-color: #f9f9f9;
}
</style>
