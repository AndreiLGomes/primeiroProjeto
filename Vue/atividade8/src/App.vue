<template>
  <div class="container">
    <LoginUsuario />
    <hr />
    <ListaProdutos />
  </div>

  <router-view />
</template>

<script>
import LoginUsuario from './components/LoginUsuario.vue';
import ListaProdutos from './components/ListaProdutos.vue';

export default {
  components: {
    LoginUsuario,
    ListaProdutos
  }
};
</script>
