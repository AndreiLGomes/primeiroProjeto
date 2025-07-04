<template>
  <div class="container mt-5">
    <form @submit.prevent="enviarFormulario" novalidate :class="{ 'was-validated': foiValidado }">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="nome" class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            id="nome"
            v-model="form.nome"
            required
          />
          <div class="invalid-feedback">Por favor, insira seu nome.</div>
        </div>

        <div class="col-md-6">
          <label for="email" class="form-label">E-mail</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            required
          />
          <div class="invalid-feedback">E-mail válido é obrigatório.</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="senha" class="form-label">Senha</label>
          <input
            type="password"
            class="form-control"
            id="senha"
            v-model="form.senha"
            required
            minlength="6"
          />
          <div class="invalid-feedback">Senha deve ter no mínimo 6 caracteres.</div>
        </div>
      </div>

      <button type="submit" class="btn btn-success">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormularioUsuario',
  data() {
    return {
      form: {
        nome: '',
        email: '',
        senha: '',
      },
      foiValidado: false,
    };
  },
  methods: {
    enviarFormulario() {
      this.foiValidado = true;
      const formValido = this.form.nome && this.form.email && this.form.senha.length >= 6;
      if (formValido) {
        alert('Formulário enviado com sucesso!');
        // Aqui você pode processar ou limpar o formulário
      }
    },
  },
};
</script>
