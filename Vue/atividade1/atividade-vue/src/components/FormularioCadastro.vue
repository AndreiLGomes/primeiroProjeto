<template>
  <div class="container">
    <h1>Cadastro de Usuário</h1>

    <form @submit.prevent="cadastrarUsuario">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input id="nome" v-model="form.nome" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input id="telefone" v-model="form.telefone" type="tel" required />
      </div>

      <button type="submit">Cadastrar</button>
    </form>

    <div v-if="usuarios.length" class="usuarios">
      <h2>Usuários cadastrados:</h2>
      <ul>
        <li v-for="(usuario, index) in usuarios" :key="index">
          {{ usuario.nome }} - {{ usuario.email }} - {{ usuario.telefone }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FormularioCadastro',
  setup() {
    const form = ref({
      nome: '',
      email: '',
      telefone: ''
    });

    const usuarios = ref([]);

    const cadastrarUsuario = () => {
      if (!form.value.nome || !form.value.email || !form.value.telefone) {
        alert('Preencha todos os campos.');
        return;
      }

      usuarios.value.push({ ...form.value });
      form.value.nome = '';
      form.value.email = '';
      form.value.telefone = '';
    };

    return {
      form,
      usuarios,
      cadastrarUsuario
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
h1, h2 {
  color: #2c3e50;
}
form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  opacity: 0.9;
}
.usuarios {
  margin-top: 30px;
  background-color: #eef;
  padding: 15px;
  border-radius: 5px;
}
</style>
