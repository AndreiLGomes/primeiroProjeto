// worker-monitor.js
import { parentPort } from 'worker_threads';

function tarefaLenta() {
    let soma = 0;
    for (let i = 0; i < 1e8; i++) {
        soma += i;
        if (i % 2e7 === 0) {
            parentPort.postMessage(`Progresso: ${(i / 1e8 * 100).toFixed(0)}%`);
        }
    }
    return soma;
}

try {
    const resultado = tarefaLenta();
    parentPort.postMessage(` Tarefa finalizada. Resultado: ${resultado}`);
} catch (erro) {
    parentPort.postMessage(` Erro no worker: ${erro.message}`);
}
