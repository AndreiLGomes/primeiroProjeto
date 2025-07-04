<template>
  <div class="text-center mt-5">
    <!-- Botão que abre o modal -->
    <button
      type="button"
      class="btn btn-info"
      data-bs-toggle="modal"
      data-bs-target="#meuModal"
    >
      Abrir Modal
    </button>

    <!-- Modal Bootstrap -->
    <div
      class="modal fade"
      id="meuModal"
      tabindex="-1"
      aria-labelledby="tituloModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tituloModal">Aviso Importante</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            ></button>
          </div>
          <div class="modal-body">
            Esta é uma mensagem dentro do modal.(nota 10)
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalAlerta',
};
</script>
