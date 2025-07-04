<template>
  <div class="text-center mt-4">
    <button
      class="btn"
      :class="classeAtual"
      @click="alternarCor"
    >
      Clique para mudar a cor!
    </button>
  </div>
</template>

<script>
export default {
  name: 'BotaoDinamico',
  data() {
    return {
      cores: ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-dark'],
      indice: 0,
    };
  },
  computed: {
    classeAtual() {
      return this.cores[this.indice];
    },
  },
  methods: {
    alternarCor() {
      this.indice = (this.indice + 1) % this.cores.length;
    },
  },
};
</script>
