<template>
  <div class="layout">
    <header class="cabecalho">
      <slot name="cabecalho">[Cabeçalho padrão]</slot>
    </header>

    <main class="conteudo">
      <slot></slot> <!-- slot padrão -->
    </main>

    <footer class="rodape">
      <slot name="rodape">[Rodapé padrão]</slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ComponenteComSlot'
};
</script>

<style scoped>
.layout {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  background-color: #fdfdfd;
}
.cabecalho {
  background-color: #e0f7fa;
  padding: 10px;
  font-weight: bold;
}
.conteudo {
  margin: 15px 0;
}
.rodape {
  background-color: #e0f2f1;
  padding: 10px;
  font-size: 0.9em;
}
</style>
