<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="fazerLogin">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" v-model="senha" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="erro" style="color: red;">{{ erro }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormLogin',
  data() {
    return {
      email: '',
      senha: '',
      erro: ''
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          senha: this.senha
        });

        const token = response.data.token;
        localStorage.setItem('token', token); // ✅ Armazena token

        // Redireciona para página protegida
        this.$router.push('/usuarios');
      } catch (err) {
        this.erro = 'Credenciais inválidas.';
        console.error(err);
      }
    }
  }
};
</script>
