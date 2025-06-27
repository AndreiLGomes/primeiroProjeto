// cluster-server.js
import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(` Processo Master PID ${process.pid} iniciando...`);
    console.log(` Detected ${numCPUs} CPUs - criando workers...`);

    // Cria um worker por núcleo
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Caso algum worker morra, cria outro
    cluster.on('exit', (worker, code, signal) => {
        console.log(` Worker PID ${worker.process.pid} morreu. Criando outro...`);
        cluster.fork();
    });

} else {
    // Código executado por cada worker
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Worker PID ${process.pid} respondeu!\n`);
    });

    server.listen(3000, () => {
        console.log(` Worker PID ${process.pid} escutando na porta 3000`);
    });
}
