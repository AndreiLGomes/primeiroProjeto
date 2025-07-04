<template>
  <div class="mensagem">
    <h2>{{ mensagem }}</h2>
    <button @click="mostrarMensagem">Mensagem do Mixin</button>
  </div>
</template>

<script>
import meuMixin from '../mixins/meuMixin';

export default {
  name: 'Mensagem',
  mixins: [meuMixin],
  data() {
    return {
      mensagem: 'Esta é uma mensagem dinâmica do componente.'
    };
  }
};
</script>

<style scoped>
.mensagem {
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #00796b;
  font-size: 20px;
}
</style>
