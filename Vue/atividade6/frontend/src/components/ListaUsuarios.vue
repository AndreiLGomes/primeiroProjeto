<template>
  <div>
    <h2>Lista de Usuários</h2>
    <ul v-if="usuarios.length">
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.nome }} - {{ usuario.email }}
      </li>
    </ul>
    <p v-else>Nenhum usuário encontrado.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListaUsuarios',
  data() {
    return {
      usuarios: []
    };
  },
  mounted() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      this.usuarios = response.data;
    })
    .catch(error => {
      console.error('Erro ao buscar usuários:', error);
      // Se o token estiver errado, redireciona pro login
      this.$router.push('/');
    });
  }
};
</script>
