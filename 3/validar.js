document.getElementById("formulario").addEventListener("submit", function (event) {


    var nome = document.getElementById("nome");
    var email = document.getElementById("email");

    if (nome.value.trim() === "") {
        alert("Nome não informado");
        nome.focus();
        event.preventDefault(); // Impede o envio do formulário
        return
    }
    if (email.value.trim() === "") {
        alert("Email não informado");
        nome.focus();
        event.preventDefault(); // Impede o envio do formulário
        return
    }
});
