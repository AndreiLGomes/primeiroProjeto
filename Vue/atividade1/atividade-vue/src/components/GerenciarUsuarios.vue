<template>
  <div class="container">
    <h2>Gerenciar Usuários</h2>

    <div class="add-user">
      <input v-model="nomeNovoUsuario" placeholder="Digite o nome" />
      <button @click="adicionarUsuario">Adicionar Usuário</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
          <td>
            <button @click="removerUsuario(usuario.id)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'GerenciarUsuarios',
  setup() {
    const usuarios = ref([]);
    const nomeNovoUsuario = ref('');

    const getUsuarios = async () => {
      try {
        const resposta = await axios.get('http://localhost:3000/usuarios');
        usuarios.value = resposta.data;
      } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
      }
    };

    const adicionarUsuario = async () => {
      if (nomeNovoUsuario.value.trim() === '') {
        alert('Informe um nome válido.');
        return;
      }
      try {
        await axios.post('http://localhost:3000/usuarios', {
          nome: nomeNovoUsuario.value
        });
        nomeNovoUsuario.value = '';
        getUsuarios();
      } catch (erro) {
        console.error('Erro ao adicionar usuário:', erro);
      }
    };

    const removerUsuario = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${id}`);
        getUsuarios();
      } catch (erro) {
        console.error('Erro ao remover usuário:', erro);
      }
    };

    onMounted(() => {
      getUsuarios();
    });

    return {
      usuarios,
      nomeNovoUsuario,
      adicionarUsuario,
      removerUsuario
    };
  }
};
</script>

<style scoped>
.container {
  font-family: Arial, Helvetica, sans-serif;
  width: 600px;
  margin: 30px auto;
}
.add-user {
  display: flex;
  margin-bottom: 15px;
}
.add-user input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}
.add-user button {
  padding: 8px 15px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid #ccc;
}
th, td {
  padding: 8px;
  text-align: center;
}
th {
  background-color: #42b983;
  color: white;
}
button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  opacity: 0.8;
}
</style>
