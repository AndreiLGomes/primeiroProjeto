<template>
  <div>
    <h3>Dados da API (ver console)</h3>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ConsultaApi',
  mounted() {
    api.get('/posts/1')
      .then(response => {
        console.log('Resposta da API:', response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }
}
</script>
