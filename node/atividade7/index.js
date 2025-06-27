import axios from 'axios';
import { Worker } from 'worker_threads';
import logger from './logger.js';

//  Log inicial
logger.info('Aplicação iniciada ');

//  Função de divisão com log
function dividir(a, b) {
    if (b === 0) {
        const mensagemErro = `Tentativa de divisão por zero: ${a} / ${b}`;
        logger.error(mensagemErro);
        throw new Error(mensagemErro);
    }

    const resultado = a / b;
    logger.info(`Divisão bem-sucedida: ${a} / ${b} = ${resultado}`);
    return resultado;
}

//  Função assíncrona de requisição com axios
async function buscarPost() {
    try {
        const resposta = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        logger.info(`Post buscado: ${resposta.data.title}`);
    } catch (erro) {
        logger.error(`Erro ao buscar post: ${erro.message}`);
    }
}

//  Execução das funções
try {
    dividir(10, 2);
    dividir(5, 0);
} catch (erro) {
    logger.error(`Erro capturado: ${erro.message}`);
}

buscarPost();

//  Worker Thread
logger.info('Iniciando processo principal com Worker...');

const worker = new Worker('./worker.js', { type: 'module' });

worker.on('message', (mensagem) => {
    logger.info(` Resultado recebido do worker: ${mensagem}`);
});

worker.on('error', (erro) => {
    logger.error(` Erro no worker: ${erro.message}`);
});

worker.on('exit', (codigo) => {
    if (codigo !== 0) {
        logger.error(` Worker finalizou com código ${codigo}`);
    } else {
        logger.info(' Worker finalizado com sucesso.');
    }
});

logger.info('Aplicação finalizada ');
