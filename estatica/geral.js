// Carrega o footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("/estatica/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar o rodapé:", error));

    // Carrega o header
    fetch("/estatica/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar o cabeçalho:", error));
});
