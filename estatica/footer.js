document.addEventListener("DOMContentLoaded", function() {
    fetch("/estatica/footer.html") // Caminho absoluto desde a raiz do projeto
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-container").innerHTML = data;
    })
    .catch(error => console.error("Erro ao carregar o rodapé:", error));
});
