<template>
  <div>
    <FormularioCadastro />
    <hr />
    <GerenciarUsuarios />
    <hr />
    <ConsultaCep />
  </div>
</template>

<script>
import FormularioCadastro from './components/FormularioCadastro.vue';
import GerenciarUsuarios from './components/GerenciarUsuarios.vue';
import ConsultaCep from './components/ConsultaCep.vue';

export default {
  components: {
    FormularioCadastro,
    GerenciarUsuarios,
    ConsultaCep
  }
};
</script>
