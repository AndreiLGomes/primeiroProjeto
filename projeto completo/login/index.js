const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const matricula = form.matricula.value;
    const senha = form.senha.value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula, senha })
    });

    const data = await response.json();  // ✅ só aqui

    if (response.ok) {
        if (data.perfil === 'admin') {
            window.location.href = '/admin/admin.html';
        } else {
            localStorage.setItem('nomeFuncionario', data.nome);
            localStorage.setItem('matriculaFuncionario', form.matricula.value);
            window.location.href = '/funcionario/funcionario.html';
        }
    } else {
        document.getElementById('loginError').innerText = data.error;
        document.getElementById('loginError').style.display = 'block';
    }
});
