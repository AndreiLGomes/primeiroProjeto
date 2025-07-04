<template>
  <header class="header">
    <h1>Meu Projeto Vue</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Sobre</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #1976d2;
  color: white;
  padding: 15px;
  text-align: center;
}
a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}
</style>
