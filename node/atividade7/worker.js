// worker.js
import { parentPort } from 'worker_threads';

function tarefaPesada() {
    let contador = 0;
    for (let i = 0; i < 1e9; i++) {
        contador += i;
    }
    return contador;
}

const resultado = tarefaPesada();
parentPort.postMessage(resultado); // Envia o resultado de volta ao processo principal
