<template>
  <div class="container mt-5">
    <!-- Navegação das abas -->
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="(aba, index) in abas" :key="index">
        <button
          class="nav-link"
          :class="{ active: abaSelecionada === aba.nome }"
          @click="abaSelecionada = aba.nome"
        >
          {{ aba.label }}
        </button>
      </li>
    </ul>

    <!-- Conteúdo das abas -->
    <div class="tab-content border-start border-end border-bottom p-4">
      <div v-if="abaSelecionada === 'home'">
        <h4>Início</h4>
        <p>Bem-vindo à aba inicial. Aqui você encontra o conteúdo principal.</p>
      </div>
      <div v-else-if="abaSelecionada === 'perfil'">
        <h4>Perfil</h4>
        <p>Esta é a aba de perfil, com informações do usuário.</p>
      </div>
      <div v-else-if="abaSelecionada === 'config'">
        <h4>Configurações</h4>
        <p>Personalize o sistema conforme sua preferência nesta aba.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AbasDinamicas',
  data() {
    return {
      abaSelecionada: 'home',
      abas: [
        { nome: 'home', label: 'Início' },
        { nome: 'perfil', label: 'Perfil' },
        { nome: 'config', label: 'Configurações' },
      ],
    };
  },
};
</script>
