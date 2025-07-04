<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-4 bg-light border p-3">
        <h5>Coluna 1</h5>
        <p>Conteúdo adaptável para telas pequenas e médias.</p>
      </div>

      <div class="col-12 col-md-4 bg-secondary text-white border p-3">
        <h5>Coluna 2</h5>
        <p>Essa coluna fica abaixo das outras em dispositivos menores.</p>
      </div>

      <div class="col-12 col-md-4 bg-dark text-white border p-3">
        <h5>Coluna 3</h5>
        <p>Responsiva, com ajuste automático conforme o tamanho da tela.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutResponsivo',
};
</script>
