document.addEventListener('DOMContentLoaded', function () {
  // Variáveis globais
let banca = 0;
let valorEntrada = 0;
let payout = 0;
let gerenciamento = "";
let wins = 0;
let losses = 0;
let lucro = 0;
let perda = 0;

// Função para calcular o valor da entrada
function calcularEntrada() {
    // Obter os valores do formulário
    banca = parseFloat(document.getElementById("banca").value);
    const porcentagemEntrada = parseFloat(document.getElementById("porcentagem").value) / 100;
    const payoutPorcentagem = parseFloat(document.getElementById("payout").value) / 100;
    gerenciamento = document.getElementById("gerenciamento").value;

    // Calcular o valor da entrada
    valorEntrada = banca * porcentagemEntrada;

    // Atualizar o placar
    document.getElementById("bancaAtual").innerHTML = `Valor da Banca: ${banca.toFixed(2)}`;
}

// Função para processar o clique no botão "Win"
function win() {
    // Calcular lucro com base no payout
    const lucroWin = valorEntrada * payout;

    // Atualizar o lucro, banca e contador de Wins
    lucro += lucroWin;
    banca += lucroWin;
    wins++;

    // Atualizar o placar
    atualizarPlacar();
}

// Função para processar o clique no botão "Loss"
function loss() {
    // Atualizar perda e contador de Losses
    perda += valorEntrada;
    losses++;

    // Atualizar o placar
    atualizarPlacar();

    // Atualizar o valor da entrada com base no gerenciamento
    if (gerenciamento === "Conservador" && losses === 2) {
        valorEntrada = valorEntrada * 1.2;
    } else if (gerenciamento === "Moderado" && losses === 2) {
        valorEntrada = valorEntrada * 1.5;
    } else if (gerenciamento === "Agressivo" && losses === 2) {
        valorEntrada = valorEntrada * 1.75;
    } else if (gerenciamento === "Conservador" && losses === 3) {
        valorEntrada = perda * 1.2;
    } else if (gerenciamento === "Moderado" && losses === 3) {
        valorEntrada = perda * 1.5;
    } else if (gerenciamento === "Agressivo" && losses === 3) {
        valorEntrada = perda * 1.75;
    }
}

// Função para atualizar o placar
function atualizarPlacar() {
    document.getElementById("wins").innerHTML = `Wins: ${wins}`;
    document.getElementById("losses").innerHTML = `Losses: ${losses}`;
    document.getElementById("bancaAtual").innerHTML = `Valor da Banca: ${banca.toFixed(2)}`;
    document.getElementById("lucro").innerHTML = `Lucro: ${lucro.toFixed(2)}`;
    document.getElementById("perda").innerHTML = `Perda: ${perda.toFixed(2)}`;
}

// Adicionar manipuladores de eventos aos botões
document.getElementById("calcularEntrada").addEventListener("click", calcularEntrada);
document.getElementById("winButton").addEventListener("click", win);
document.getElementById("lossButton").addEventListener("click", loss);
