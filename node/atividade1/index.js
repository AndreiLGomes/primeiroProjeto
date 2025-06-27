// Ativado por "type": "module" no package.json

import axios from 'axios';
import chalk from 'chalk';
import { readFile } from 'fs/promises';

// 1. Mensagem de boas-vindas
console.log("Bem-vindo ao Node.js!");

// 2. Mensagem com atraso de 3 segundos
setTimeout(() => {
    console.log("Essa mensagem apareceu após 3 segundos!");
}, 3000);

// 3. Requisição com axios
axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
        console.log("Título do post:", res.data.title);
    })
    .catch(err => {
        console.error(chalk.red("Erro na requisição: " + err.message));
    });

// 4. Mensagem com chalk
console.log(chalk.red("Erro: Algo deu errado!"));

// 5. Leitura de arquivo texto.txt
try {
    const texto = await readFile('texto.txt', 'utf8');
    console.log("Conteúdo do arquivo:", texto);
} catch (err) {
    console.error("Erro ao ler o arquivo texto.txt:", err);
}

// 6. Função com callback
function somar(a, b, callback) {
    const resultado = a + b;
    callback(resultado);
}

somar(5, 7, (res) => {
    console.log("Resultado da soma:", res);
});

// 7. Leitura de arquivo JSON (usuario.json)
async function lerUsuario() {
    try {
        const data = await readFile('usuario.json', 'utf8');
        const usuario = JSON.parse(data);
        console.log("Usuário:", usuario);
    } catch (err) {
        console.error("Erro ao ler o arquivo JSON:", err);
    }
}

await lerUsuario();

// 8. Data e hora atuais
const agora = new Date();
const formatado = agora.toLocaleString('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'medium'
});
console.log("Data e hora atual:", formatado);
