<template>
  <div class="d-flex flex-column min-vh-100">
    <AppNavbar />
 <AbasDinamicas />
    <div class="container mt-4 flex-grow-1">
      <div class="row">
        <div class="col-sm-12 col-lg-3 bg-primary text-white p-3">Coluna 1</div>
        <div class="col-sm-12 col-lg-6 bg-success text-white p-3">Coluna 2</div>
        <div class="col-sm-12 col-lg-3 bg-danger text-white p-3">Coluna 3</div>
      </div>

      <BotaoDinamico />
      <MeuCard />
      <LayoutResponsivo />
      <ModalAlerta />
      <FormularioUsuario />

      <!-- Conteúdo centralizado extra (atividade 9) -->
      <div class="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div class="text-center">
          <h2>Conteúdo Centralizado</h2>
          <p>Este é um exemplo de conteúdo centralizado, conforme a Atividade 9.</p>
        </div>
      </div>

      <!-- Atividade 10: Sistema de abas -->
     
    </div>

    <RodapeFixado />
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';
import BotaoDinamico from './components/BotaoDinamico.vue';
import MeuCard from './components/MeuCard.vue';
import LayoutResponsivo from './components/LayoutResponsivo.vue';
import ModalAlerta from './components/ModalAlerta.vue';
import FormularioUsuario from './components/FormularioUsuario.vue';
import RodapeFixado from './components/RodapeFixado.vue';
import AbasDinamicas from './components/AbasDinamicas.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    BotaoDinamico,
    MeuCard,
    LayoutResponsivo,
    ModalAlerta,
    FormularioUsuario,
    RodapeFixado,
    AbasDinamicas,
  },
};
</script>
