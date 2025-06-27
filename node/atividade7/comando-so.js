// comando-so.js
import { exec } from 'child_process';

const comando = process.platform === 'win32' ? 'dir' : 'ls -la';

exec(comando, (erro, stdout, stderr) => {
    if (erro) {
        console.error(` Erro ao executar comando: ${erro.message}`);
        return;
    }

    if (stderr) {
        console.error(` Saída de erro: ${stderr}`);
        return;
    }

    console.log(` Resultado do comando:\n${stdout}`);
});
