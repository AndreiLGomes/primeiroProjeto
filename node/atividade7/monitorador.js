// monitorador.js
import { Worker } from 'worker_threads';
import logger from './logger.js';

logger.info(' Iniciando monitoramento de tarefa paralela com Worker Thread...');

const worker = new Worker('./worker-monitor.js', { type: 'module' });

worker.on('message', (msg) => {
    logger.info(` Worker: ${msg}`);
});

worker.on('error', (err) => {
    logger.error(` Erro no worker: ${err.message}`);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        logger.warn(` Worker finalizou com código ${code}`);
    } else {
        logger.info(' Worker finalizado com sucesso!');
    }
});
