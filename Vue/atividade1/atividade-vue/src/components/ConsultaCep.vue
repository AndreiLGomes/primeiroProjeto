<template>
  <div class="cep-container">
    <h2>Consultar Endereço por CEP</h2>

    <form @submit.prevent="buscarCep">
      <input
        v-model="cep"
        type="text"
        placeholder="Digite o CEP (somente números)"
        maxlength="8"
        required
      />
      <button type="submit">Buscar</button>
    </form>

    <div v-if="endereco">
      <h3>Endereço Encontrado:</h3>
      <p><strong>Logradouro:</strong> {{ endereco.logradouro }}</p>
      <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
      <p><strong>Cidade:</strong> {{ endereco.localidade }}</p>
      <p><strong>Estado:</strong> {{ endereco.uf }}</p>
    </div>

    <div v-if="erro" class="erro">{{ erro }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'ConsultaCep',
  setup() {
    const cep = ref('');
    const endereco = ref(null);
    const erro = ref('');

    const buscarCep = async () => {
      erro.value = '';
      endereco.value = null;

      if (cep.value.length !== 8) {
        erro.value = 'O CEP deve conter exatamente 8 dígitos.';
        return;
      }

      try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep.value}/json/`);

        if (resposta.data.erro) {
          erro.value = 'CEP não encontrado.';
        } else {
          endereco.value = resposta.data;
        }
      } catch (e) {
        erro.value = 'Erro ao buscar o CEP.';
      }
    };

    return {
      cep,
      endereco,
      erro,
      buscarCep
    };
  }
};
</script>

<style scoped>
.cep-container {
  max-width: 400px;
  margin: 30px auto;
  font-family: Arial;
}
form {
  display: flex;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}
button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}
.erro {
  color: red;
  margin-top: 10px;
}
</style>
