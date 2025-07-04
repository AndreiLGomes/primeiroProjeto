<template>
  <div>
    <Header />
    
    <!-- Aqui está o componente pai original, que você quer manter -->
    <ComponentePai />

    <!-- Aqui é onde suas páginas (Home, About...) vão aparecer -->
    <router-view />

    <Footer />
  </div>
</template>

<script>
import ComponentePai from './components/ComponentePai.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    ComponentePai,
    Header,
    Footer
  }
};
</script>
