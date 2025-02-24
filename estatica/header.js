document.addEventListener("DOMContentLoaded", function () {
    fetch("/estatica/header.html") // Caminho absoluto desde a raiz do projeto
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar o rodapé:", error));
});