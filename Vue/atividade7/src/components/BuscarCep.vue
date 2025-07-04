<template>
  <div>
    <h3>Buscar Endereço por CEP</h3>
    <input v-model="cep" placeholder="Digite o CEP" />
    <button @click="buscarEndereco">Buscar</button>

    <!-- Loading -->
    <div v-if="carregando" style="color: blue; margin-top: 10px;">
      🔄 Buscando informações...
    </div>

    <!-- Erro amigável -->
    <div v-if="erro && !carregando" style="color: red;">
      ⚠️ {{ erro }}
    </div>

    <!-- Dados -->
    <div v-if="endereco && !erro && !carregando">
      <p><strong>Logradouro:</strong> {{ endereco.logradouro }}</p>
      <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
      <p><strong>Cidade:</strong> {{ endereco.localidade }}</p>
      <p><strong>Estado:</strong> {{ endereco.uf }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BuscarCep',
  data() {
    return {
      cep: '',
      endereco: null,
      erro: '',
      carregando: false
    };
  },
  methods: {
    buscarEndereco() {
      this.erro = '';
      this.endereco = null;
      this.carregando = true;

      if (!this.cep || this.cep.length !== 8 || isNaN(this.cep)) {
        this.erro = 'Por favor, insira um CEP válido com 8 números.';
        this.carregando = false;
        return;
      }

      axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then(response => {
          if (response.data.erro) {
            this.erro = 'CEP não encontrado. Tente outro.';
          } else {
            this.endereco = response.data;
          }
        })
        .catch(error => {
          if (!error.response) {
            this.erro = 'Sem conexão com a internet. Verifique sua rede.';
          } else if (error.response.status >= 500) {
            this.erro = 'Servidor fora do ar. Tente novamente mais tarde.';
          } else {
            this.erro = 'Erro inesperado. Tente novamente.';
          }
        })
        .finally(() => {
          this.carregando = false;
        });
    }
  }
}
</script>
