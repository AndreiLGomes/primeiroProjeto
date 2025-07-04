<template>
  <div class="filho">
    <h2>Filho</h2>
    <button @click="enviarMensagem">Enviar mensagem ao Pai</button>
    <button @click="mostrarMensagem">Mensagem do Mixin</button>
    <p v-if="mensagemDoPai">Mensagem recebida do Pai: {{ mensagemDoPai }}</p>

  </div>
</template>

<script>
import meuMixin from '../mixins/meuMixin';

export default {
  name: 'ComponenteFilho',
  props: {
  mensagemDoPai: {
    type: String,
    default: ''
  }
},
  mixins: [meuMixin],
  methods: {
    enviarMensagem() {
      this.$emit('mensagem-enviada', 'Olá, Pai! Essa mensagem veio do Filho!');
    }
  }
};



</script>

<style scoped>
.filho {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff8e1;
  margin-top: 10px;
}
</style>
