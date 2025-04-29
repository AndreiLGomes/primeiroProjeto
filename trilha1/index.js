// let meuArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// function acharNumero(numero) {
//     for (let i = 0; i < meuArray.length; i++) {
//         if (meuArray[i] === numero) {
//             console.log(`Número ${numero} encontrado na posição ${i}.`);
//             return i; // Retorna a posição do número encontrado
//         }
//     }
//     console.log(`Número ${numero} não encontrado no array.`);
//     return -1; // Retorna -1 se o número não for encontrado
// }
// // Testando a função
// acharNumero(3);
// acharNumero(11);
// // -----------

// meuArray.splice(2, 1);

// console.log(meuArray);


// let meuArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// meuArray2.unshift(0);
// meuArray2.push(11);

// for (let index = 0; index < meuArray2.length; index++) {
//     const element = meuArray2[index];
// }
// meuArray2.splice(5, 1);
// console.log(meuArray2)

// const numero = 9;
// for (let index = 0; index < meuArray2.length; index++) {
//     if (numero == index) {
//         console.log("achou o numero: " + numero)
//     }
// }
// -----------------------

// Criando um Vagão (Nó da Lista)
function criarVagao(numero) {
    return { numero, proximo: null, anterior: null };
}

// Criando o Trem (Lista Duplamente Encadeada)
function criarTrem() {
    return { primeiro: null, ultimo: null };
}

// Adicionando um novo vagão ao final do trem

function adicionarVagao(trem, numero) {
    let novoVagao = criarVagao(numero);
    if (!trem.primeiro) {
        trem.primeiro = trem.ultimo = novoVagao;
    } else {
        trem.ultimo.proximo = novoVagao;          //1 > 2   vagao 1 sabe o proxima vagao é o numero 2
        novoVagao.anterior = trem.ultimo;         //1 <-> 2 vagao 2 sabe que anterior dele é o numero 1
        trem.ultimo = novoVagao;                 //Agora, o novo último vagão do trem é o Vagão 2.   
    }
}
// Exemplo de uso
let trem = criarTrem();
adicionarVagao(trem, 1);
adicionarVagao(trem, 2);
adicionarVagao(trem, 3);
adicionarVagao(trem, 4);

function removerUltimoVagao(trem) {
    if (!trem.ultimo) {
        console.log("🚆 O trem está vazio!");
        return;
    }
    console.log(`🚆 Removendo vagão ${trem.ultimo.numero} do final do trem.`);
    trem.ultimo = trem.ultimo.anterior;
    if (trem.ultimo) {
        trem.ultimo.proximo = null;
    } else {
        trem.primeiro = null; // Se o último foi removido, o trem está vazio
    };
};
// Removendo um vagão
removerUltimoVagao(trem);

function percorrerVagao(trem) {
    let atual = trem.primeiro;
    console.log("indo pra frente");
    while (atual) {
        console.log(`${atual.numero}`)
        atual = atual.proximo
    }
    let atual2 = trem.ultimo;
    console.log("indo pra atraz");
    while (atual2) {
        console.log(`${atual2.numero}`)
        atual2 = atual2.anterior
    }
}

percorrerVagao(trem)
// 
console.log("=================== OUTRA ATIVIDADE ====================")
let pilha = [];

function colocarPilha(numero) {
    pilha.push(numero)
    console.log(numero)

}
function removerPilha() {

    pilha.pop()

}

function verificar() {
    let controle = false;
    for (let i = 0; i < pilha.length; i++) {
        controle = true
    }
    if (controle) {
        console.log("está cheia")
    } else {
        console.log("esta vazio!")
    }
}

colocarPilha(1);
colocarPilha(8);
colocarPilha(7);
colocarPilha(6);
removerPilha()
verificar()

console.log("==========================proxima==================");

function verificarBalanceamento(expressao) {
    let caixa = []; // Nossa caixa de brinquedos 🏗
    let pares = { ')': '(', '}': '{', ']': '[' }; // Lista dos pares

    for (let simbolo of expressao) {
        if (simbolo === '(' || simbolo === '{' || simbolo === '[') {
            caixa.push(simbolo); // Guardamos na caixa
        } else if (simbolo === ')' || simbolo === '}' || simbolo === ']') {
            if (caixa.length === 0 || caixa.pop() !== pares[simbolo]) {
                return false; // Se a caixa está vazia ou pegamos o brinquedo errado, ERRO! ❌
            }
        }
    }
    return caixa.length === 0; // Se a caixa estiver vazia no final, está tudo certo ✅
}

// Testes
console.log(verificarBalanceamento("(){}[]")); // true ✅ Tudo certo!
console.log(verificarBalanceamento("({[()]})")); // true ✅ Tudo certo!
console.log(verificarBalanceamento("{[()]})")); // false ❌ Fechamos algo errado!
console.log(verificarBalanceamento("({[}])")); // false ❌ Bagunçamos tudo!
console.log(verificarBalanceamento("(((")); // false ❌ Esquecemos de fechar!

console.log("==========================proxima==================");

function criarFilaCircular(tamanho) {
    return { itens: new Array(tamanho), tamanho: tamanho, inicio: 0, fim: 0, quantidade: 0 };
}

// Adiciona na fila (Enqueue)
function enqueueCircular(fila, item) {
    if (fila.quantidade === fila.tamanho) {
        console.log("❌ A fila está cheia! Não pode adicionar mais.");
        return;
    }
    fila.itens[fila.fim] = item;
    fila.fim = (fila.fim + 1) % fila.tamanho;
    fila.quantidade++;
    console.log(`🧑‍🦰 ${item} entrou na fila.`);
}

// Remove da fila e coloca no final (Fila Circular)
function dequeueCircular(fila) {
    if (fila.quantidade === 0) {
        console.log("❌ A fila está vazia!");
        return null;
    }
    let removido = fila.itens[fila.inicio];
    fila.inicio = (fila.inicio + 1) % fila.tamanho;
    fila.quantidade--;
    console.log(`🔄 ${removido} saiu da fila e voltou para o final.`);
    enqueueCircular(fila, removido); // Coloca de volta no final (Fila Circular)
    return removido;
}

// Mostra a fila
function mostrarFilaCircular(fila) {
    let filaAtual = [];
    let index = fila.inicio;
    for (let i = 0; i < fila.quantidade; i++) {
        filaAtual.push(fila.itens[index]);
        index = (index + 1) % fila.tamanho;
    }
    console.log("📌 Fila atual:", filaAtual.join(" <- ") || "Vazia");
}

// Exemplo de uso
let filaCircular = criarFilaCircular(5);
enqueueCircular(filaCircular, "Ana");
enqueueCircular(filaCircular, "Bruno");
enqueueCircular(filaCircular, "Carlos");
mostrarFilaCircular(filaCircular);  // Ana <- Bruno <- Carlos

dequeueCircular(filaCircular);  // Ana sai e volta para o final
mostrarFilaCircular(filaCircular);  // Bruno <- Carlos <- Ana

console.log("======================proximo========================");
function fatorial(n) {
    if (n === 0 || n === 1) {
        return 1; // Caso base: se for 0 ou 1, retorna 1
    }
    return n * fatorial(n - 1); // Chama a função de novo com (n - 1)
}

// Testando a função
console.log(fatorial(5)); // 120
console.log(fatorial(3)); // 6
console.log(fatorial(1)); // 1
console.log(fatorial(0)); // 1

console.log("=========================proximo=========================");

function fibonacciRapido(n, memo = {}) {
    if (n in memo) return memo[n]; // Se já calculamos antes, usamos o valor salvo
    if (n <= 1) return n;

    memo[n] = fibonacciRapido(n - 1, memo) + fibonacciRapido(n - 2, memo);
    return memo[n];
}

// Testando a função
console.log(fibonacciRapido(50)); // 12586269025 (Muito rápido!)

console.log("=======================proxmo=====================");
// Criando um nó da árvore binária
function criarNo(valor) {
    return { valor, esquerda: null, direita: null };
}

// Criando uma árvore de exemplo
let raiz = criarNo("Rei");
raiz.esquerda = criarNo("Príncipe");
raiz.direita = criarNo("Princesa");
raiz.esquerda.esquerda = criarNo("João");
raiz.esquerda.direita = criarNo("Ana");
raiz.direita.esquerda = criarNo("Pedro");
raiz.direita.direita = criarNo("Maria");

// Percurso In-Order (Esquerda → Pai → Direita)
function inOrder(no) {
    if (no !== null) {
        inOrder(no.esquerda);
        console.log(no.valor);
        inOrder(no.direita);
    }
}

// Percurso Pre-Order (Pai → Esquerda → Direita)
function preOrder(no) {
    if (no !== null) {
        console.log(no.valor);
        preOrder(no.esquerda);
        preOrder(no.direita);
    }
}

// Percurso Post-Order (Esquerda → Direita → Pai)
function postOrder(no) {
    if (no !== null) {
        postOrder(no.esquerda);
        postOrder(no.direita);
        console.log(no.valor);
    }
}

// Testando os percursos
console.log("📌 In-Order:");
inOrder(raiz); // João → Príncipe → Ana → Rei → Pedro → Princesa → Maria

console.log("\n📌 Pre-Order:");
preOrder(raiz); // Rei → Príncipe → João → Ana → Princesa → Pedro → Maria

console.log("\n📌 Post-Order:");
postOrder(raiz); // João → Ana → Príncipe → Pedro → Maria → Princesa → Rei

console.log("=====================proximo=======================");

function somaLista(caixa) {
    if (caixa === null) return 0;  // Se não tem mais caixas, retorna 0
    return caixa.valor + somaLista(caixa.proximo); // Soma a caixa atual com as próximas
}

// Criando a fila de caixas 📦
let fila = { valor: 1, proximo: { valor: 2, proximo: { valor: 3, proximo: { valor: 4, proximo: { valor: 5, proximo: null } } } } };

// Testando a soma
console.log(somaLista(fila)); // 15

// Criando um nó da árvore
function criarNo(valor) {
    return { valor, esquerda: null, direita: null };
}

// Criando a árvore BST 🌳 (agora chamada de 'arvore' em vez de 'raiz')
let arvore = criarNo(10);
arvore.esquerda = criarNo(5);
arvore.direita = criarNo(15);
arvore.esquerda.esquerda = criarNo(3);
arvore.esquerda.direita = criarNo(7);
arvore.direita.esquerda = criarNo(12);
arvore.direita.direita = criarNo(18);

// Função recursiva para buscar um valor na árvore
function buscarValor(no, valor) {
    if (no === null) return false; // Se chegamos em um nó vazio, o valor não está na árvore
    if (no.valor === valor) return true; // Se achamos o valor, retorna verdadeiro

    if (valor < no.valor) {
        return buscarValor(no.esquerda, valor); // Se for menor, busca na esquerda
    } else {
        return buscarValor(no.direita, valor); // Se for maior, busca na direita
    }
}

// Testando a busca 🔍
console.log(buscarValor(arvore, 7));  // true ✅ (Encontrado)
console.log(buscarValor(arvore, 12)); // true ✅ (Encontrado)
console.log(buscarValor(arvore, 20)); // false ❌ (Não encontrado)


console.log("=====================proximo=======================");

function torreDeHanoi(n, origem, destino, auxiliar) {
    if (n === 1) {
        console.log(`Mova o disco 1 de ${origem} para ${destino}`);
        return 1; // Apenas 1 movimento
    }

    let movimentos = 0;

    // Passo 1: Mover (n-1) discos da origem para a torre auxiliar
    movimentos += torreDeHanoi(n - 1, origem, auxiliar, destino);

    // Passo 2: Mover o disco maior diretamente para a torre de destino
    console.log(`Mova o disco ${n} de ${origem} para ${destino}`);
    movimentos += 1;

    // Passo 3: Mover os (n-1) discos da torre auxiliar para a torre de destino
    movimentos += torreDeHanoi(n - 1, auxiliar, destino, origem);

    return movimentos; // Retorna o número total de movimentos
}

// Testando com 3 discos
let totalMovimentos = torreDeHanoi(3, "Torre 1", "Torre 3", "Torre 2");
console.log(`✅ Total de movimentos: ${totalMovimentos}`);

console.log("========================proximp=====================");

// Criando um vagão (nó da lista encadeada)
function criarVagao(valor, proximo = null) {
    return { valor, proximo };
}

// Criando o trem (Lista Encadeada)
let tremm = criarVagao(1, criarVagao(2, criarVagao(3, criarVagao(4, criarVagao(5, null)))));

// Função recursiva para contar os vagões
function contarVagoes(vagao) {
    if (vagao === null) return 0; // Se não tem mais vagões, retorna 0
    return 1 + contarVagoes(vagao.proximo); // Conta o vagão atual e chama o próximo
}

// Testando a função
console.log("📌 Total de vagões no trem:", contarVagoes(tremm)); // Resultado: 5
