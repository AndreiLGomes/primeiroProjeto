<template>
  <form class="formulario" @submit.prevent="$emit('submit')">
    <div class="form-header">
      <slot name="header">[Cabeçalho Padrão]</slot>
    </div>

    <div class="form-campos">
      <slot name="campos">
        <p>Nenhum campo foi definido.</p>
      </slot>
    </div>

    <div class="form-botoes">
      <slot name="botoes">
        <button type="submit">Enviar (padrão)</button>
      </slot>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormularioComSlot'
};
</script>

<style scoped>
.formulario {
  border: 2px solid #aaa;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f4f4f4;
}
.form-header,
.form-campos,
.form-botoes {
  margin-bottom: 15px;
}
</style>
