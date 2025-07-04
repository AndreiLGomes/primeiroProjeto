export default {
    data() {
        return {
            mensagemMixin: 'Olá! Esta mensagem vem do Mixin!'
        };
    },
    methods: {
        mostrarMensagem() {
            alert(this.mensagemMixin);
        }
    }
};
