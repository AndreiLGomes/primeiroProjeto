<template>
  <div class="container mt-4">
    <h3> Login do Usuário</h3>

    <form class="p-3 border rounded bg-light" @submit.prevent="fazerLogin">
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="E-mail" required />
      </div>
      <div class="mb-3">
        <input v-model="senha" type="password" class="form-control" placeholder="Senha" required />
      </div>
      <button class="btn btn-primary w-100" type="submit">Entrar</button>
    </form>

    <div v-if="auth.isAuthenticated" class="alert alert-success mt-3">
       Login efetuado com sucesso! Bem-vindo, {{ auth.getUsuario?.nome || 'usuário' }}.
    </div>
    <div v-if="erro" class="alert alert-danger mt-3">⚠️ {{ erro }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
const email = ref('');
const senha = ref('');
const erro = ref('');

function fazerLogin() {
  // Simulação de login com verificação fixa
  if (email.value === 'admin@email.com' && senha.value === '123456') {
    const usuario = {
      nome: 'Admin',
      email: email.value
    };
    auth.login('token_falso_123', usuario);
    erro.value = '';
  } else {
    erro.value = 'E-mail ou senha inválidos.';
  }
}
</script>
