<template>
<div class="container">
  <div id="app">
   
    <LoginUsuario />
    <ConsultaApi />
    <BuscarCep />
    <ClimaCidade />
    <CrudPost />
  </div>
  </div>
</template>

<script>
import LoginUsuario from './components/LoginUsuario.vue'
import ConsultaApi from './components/ConsultaApi.vue'
import BuscarCep from './components/BuscarCep.vue'
import ClimaCidade from './components/ClimaCidade.vue'
import CrudPost from './components/CrudPost.vue'

export default {
  name: 'App',
  components: {
    LoginUsuario,
    ConsultaApi,
    BuscarCep,
    ClimaCidade,
    CrudPost
  }
}
</script>


<style>
body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h3 {
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 4px;
}

form {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}

input, textarea, select, button {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background: #007BFF;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: white;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

li strong {
  display: block;
  font-size: 16px;
  margin-bottom: 6px;
}

button + button {
  margin-left: 10px;
}

.alert {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}

.alert-error {
  background: #ffc9c9;
  color: #a30000;
}

.alert-success {
  background: #c9ffd8;
  color: #005f1f;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
