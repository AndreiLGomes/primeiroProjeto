<template>
  <div>
    <h3>Login</h3>
    <form @submit.prevent="fazerLogin">
      <input type="email" v-model="email" placeholder="E-mail" />
      <input type="password" v-model="senha" placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>

    <div v-if="erro" style="color: red;">⚠️ {{ erro }}</div>
    <div v-if="token" style="color: green;">🔐 Login efetuado com sucesso!</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginUsuario',
  data() {
    return {
      email: '',
      senha: '',
      erro: '',
      token: '',
      dadosProtegidos: null
    };
  },
  methods: {
    fazerLogin() {
      this.erro = '';
      this.token = '';

      axios.post('https://reqres.in/api/login', {
        email: this.email,
        password: this.senha
      })
      .then(response => {
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.buscarDadosProtegidos(); // chama após login
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          this.erro = 'E-mail ou senha inválidos.';
        } else {
          this.erro = 'Erro ao realizar login.';
        }
      });
    },

    buscarDadosProtegidos() {
      const token = localStorage.getItem('token');

      axios.get('https://reqres.in/api/users/2', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.dadosProtegidos = response.data;
        console.log('Dados protegidos:', this.dadosProtegidos);
      })
      .catch(() => {
        this.erro = 'Erro ao buscar dados protegidos.';
      });
    }
  }
}
</script>

