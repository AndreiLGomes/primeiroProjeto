import http from 'http';




import { writeFile, readFile } from 'fs/promises';

// Caminho e conteúdo do arquivo
const caminhoArquivo = 'meuarquivo.txt';
const conteudo = 'Olá! Este é um conteúdo escrito com Node.js.';

try {
    // 1. Criar o arquivo com conteúdo
    await writeFile(caminhoArquivo, conteudo, 'utf8');
    console.log('Arquivo criado com sucesso.');

    // 2. Ler o conteúdo do arquivo
    const leitura = await readFile(caminhoArquivo, 'utf8');
    console.log('Conteúdo do arquivo:', leitura);

} catch (err) {
    console.error('Erro ao criar ou ler o arquivo:', err);
}

import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const stream = createReadStream('texto.txt', { encoding: 'utf8' });

const rl = createInterface({
    input: stream,
    crlfDelay: Infinity
});

console.log('Lendo arquivo linha por linha...\n');

rl.on('line', (linha) => {
    console.log(`Linha: ${linha}`);
});

rl.on('close', () => {
    console.log('\nLeitura concluída.');
});


// 1. Criar uma string
const texto = 'Olá, mundo do Node.js!';

// 2. Converter a string para um Buffer (binário)
const buffer = Buffer.from(texto, 'utf8');

console.log('📦 Buffer (binário):', buffer);

// 3. Mostrar os valores hexadecimais dos bytes
console.log('🧬 Bytes em hexadecimal:', buffer.toString('hex'));

// 4. Converter o Buffer de volta para string
const textoOriginal = buffer.toString('utf8');

console.log('🔁 Texto original restaurado:', textoOriginal);


// index.js ATENÇÃO! PRECISA TIRAR O "type": "module", NO PACKAGE.JSON para aceitar!

// const saudacao = require('./meuModulo');

// const mensagem = saudacao('Andrei');
// console.log(mensagem);




try {
    const data = await readFile('usuario.json', 'utf8');
    const usuario = JSON.parse(data);

    console.log('Dados do usuário:');
    console.log(`Nome: ${usuario.nome}`);
    console.log(`Idade: ${usuario.idade}`);
    console.log(`Email: ${usuario.email}`);
} catch (err) {
    console.error('Erro ao ler o arquivo:', err);
}




const caminhoDoArquivo = 'arquivo_que_nao_existe.txt';

try {
    const data = await readFile(caminhoDoArquivo, 'utf8');
    console.log('Conteúdo do arquivo:', data);
} catch (err) {
    console.error(`❌ Erro ao acessar o arquivo "${caminhoDoArquivo}":`);
    console.error(err.message); // Mostra a mensagem do erro
}


import { Duplex } from 'stream';

class MaiusculaDuplex extends Duplex {
    constructor(options) {
        super(options);
        this._dadosInternos = '';
    }

    // Método de escrita: recebe dados de entrada
    _write(chunk, encoding, callback) {
        const texto = chunk.toString().toUpperCase();
        this._dadosInternos += texto;
        callback();
    }

    // Método de leitura: envia os dados processados
    _read(size) {
        if (this._dadosInternos.length > 0) {
            this.push(this._dadosInternos);
            this._dadosInternos = '';
        } else {
            this.push(null); // sinaliza fim da leitura
        }
    }
}

// Usando o stream Duplex
const duplex = new MaiusculaDuplex();

duplex.write('Olá, mundo!');
duplex.end(); // sinaliza que terminou de escrever

// Lê os dados processados
duplex.on('data', (chunk) => {
    console.log('Saída transformada:', chunk.toString());
});



import url from 'url';

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');


    if (pathname === '/') {
        res.statusCode = 200;
        res.end('🏠 Página inicial - Bem-vindo ao Node.js!');
    } else if (pathname === '/sobre') {
        res.statusCode = 200;
        res.end('ℹ️ Página Sobre - Este servidor responde rotas diferentes.');
    } else if (pathname === '/contato') {
        res.statusCode = 200;
        res.end('📞 Página de Contato - Fale conosco!');
    } else {
        res.statusCode = 404;
        res.end('❌ 404 - Página não encontrada.');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


//

function dividir(a, b) {
    return a / b;
}

const resultado = dividir(10, 0); // Divisão por zero (válida, mas suspeita)

console.log('Resultado:', resultado);

debugger;
const usuario = JSON.parse('{"nome": "Andrei", "idade": 27}');

console.log(usuario);
