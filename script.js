document.addEventListener('DOMContentLoaded', function () {
  // Variáveis para armazenar os valores
let valorBanca = 0;
let porcentagemEntrada = 0;
let payout = 0;
let valorEntrada = 0;
let wins = 0;
let losses = 0;

// Função para calcular a entrada
function calcularEntrada() {
    // Obter os valores do formulário
    valorBanca = parseFloat(document.getElementById('banca').value);
    porcentagemEntrada = parseFloat(document.getElementById('porcentagem').value);
    payout = parseFloat(document.getElementById('payout').value);

    // Calcular o valor da entrada
    valorEntrada = (valorBanca * (porcentagemEntrada / 100)).toFixed(2);

    // Exibir o valor da entrada no local designado
    document.getElementById('valorEntrada').textContent = `Valor da Entrada: ${valorEntrada}`;
}

// Função para lidar com um clique no botão "Win"
function win() {
    valorBanca += (valorEntrada * (payout / 100));
    wins++;
    atualizarPlacar();
}

// Função para lidar com um clique no botão "Loss"
function loss() {
    valorBanca -= valorEntrada;
    losses++;
    atualizarPlacar();
}

// Função para atualizar o placar
function atualizarPlacar() {
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    document.getElementById('losses').textContent = `Losses: ${losses}`;
    document.getElementById('bancaAtual').textContent = `Valor da Banca: ${valorBanca.toFixed(2)}`;
}

// Associar funções aos botões
document.getElementById('calcularEntrada').addEventListener('click', calcularEntrada);
document.getElementById('winButton').addEventListener('click', win);
document.getElementById('lossButton').addEventListener('click', loss);
