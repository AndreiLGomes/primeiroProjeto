<template>
  <div class="pai">
    <h1>Componente Pai</h1>

    <ComponenteFilho @mensagem-enviada="receberMensagem" />
    <p v-if="mensagemRecebida">Mensagem recebida do Filho: {{ mensagemRecebida }}</p>

    <ComponenteComSlot>
      <template #cabecalho>
        <h2>📌 Cabeçalho Personalizado</h2>
      </template>

      <p>Este conteúdo vai para o slot padrão.</p>

      <template #rodape>
        <p>🔻 Rodapé feito no Pai.</p>
      </template>
    </ComponenteComSlot>
  </div>
  <ListaItens />
<button @click="enviarParaFilho">Enviar dado via Prop</button>
<ComponenteFilho
  @mensagem-enviada="receberMensagem"
  :mensagem-do-pai="mensagemParaFilho"
/>

<FormularioComSlot @submit="enviarFormulario">
  <template #header>
    <h2>📝 Cadastro Rápido</h2>
  </template>

  <template #campos>
    <input type="text" v-model="nome" placeholder="Seu nome" />
    <input type="email" v-model="email" placeholder="Seu e-mail" />
  </template>

  <template #botoes>
    <button type="submit">Enviar Dados</button>
  </template>
</FormularioComSlot>

</template>

<script>
import ComponenteFilho from './ComponenteFilho.vue';
import ComponenteComSlot from './ComponenteComSlot.vue';
import ListaItens from './ListaItens.vue';
import FormularioComSlot from './FormularioComSlot.vue';


export default {
  name: 'ComponentePai',
  components: {
  ComponenteFilho,
  ComponenteComSlot,
  ListaItens,
  FormularioComSlot
},
data() {
  return {
    mensagemRecebida: '',
    mensagemParaFilho: '',
    nome: '',
    email: ''
  };
},
methods: {
  receberMensagem(mensagem) {
    this.mensagemRecebida = mensagem;
  },
  enviarParaFilho() {
    this.mensagemParaFilho = 'Essa mensagem foi enviada pelo Pai via prop!';
  },
  enviarFormulario() {
    alert(`Nome: ${this.nome}\nEmail: ${this.email}`);
  }
}

};

</script>
