<template>
  <div class="card mx-auto mt-5" style="width: 18rem;">
    <img
      src="https://via.placeholder.com/286x180.png?text=Imagem+do+Card"
      class="card-img-top"
      alt="Imagem Exemplo"
    />
    <div class="card-body">
      <h5 class="card-title">Título do Card</h5>
      <p class="card-text">Este é um card de exemplo com Bootstrap.</p>
      <button class="btn btn-primary" @click="mostrarAlerta">
        Clique Aqui
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeuCard',
  methods: {
    mostrarAlerta() {
      alert('Você clicou no botão do card!');
    },
  },
};
</script>
