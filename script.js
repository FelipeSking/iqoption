// Elementos do formulário
const bancaInput = document.getElementById("banca");
const porcentagemInput = document.getElementById("porcentagem");
const payoutInput = document.getElementById("payout");
const gerenciamentoSelect = document.getElementById("gerenciamento");
const calcularEntradaButton = document.getElementById("calcularEntrada");

// Elemento de saída para o valor da entrada
const valorEntradaOutput = document.getElementById("valorEntrada");

// Elementos do placar
const winsSpan = document.querySelector("#wins span");
const lossesSpan = document.querySelector("#losses span");
const bancaAtualSpan = document.querySelector("#bancaAtual span");
const lucroSpan = document.querySelector("#lucro span");
const perdaSpan = document.querySelector("#perda span");

// Variáveis para acompanhar os valores
let banca = 0;
let valorEntrada = 0;
let wins = 0;
let losses = 0;

// Função para calcular o valor da entrada
function calcularEntrada() {
    const valorBanca = parseFloat(bancaInput.value);
    const porcentagemEntrada = parseFloat(porcentagemInput.value) / 100;
    const payout = parseFloat(payoutInput.value) / 100;

    valorEntrada = valorBanca * porcentagemEntrada;
    valorEntradaOutput.textContent = valorEntrada.toFixed(2);
}

// Evento de clique no botão "Calcular Entrada"
calcularEntradaButton.addEventListener("click", calcularEntrada);

// Botão "Win"
const winButton = document.getElementById("winButton");
winButton.addEventListener("click", () => {
    // Atualizar os valores
    banca += valorEntrada * payout; // Calcular o novo valor da banca após um "Win"
    wins++; // Incrementar o contador de Wins

    // Atualizar o placar
    winsSpan.textContent = wins;
    bancaAtualSpan.textContent = banca.toFixed(2);
    lucroSpan.textContent = (banca - 100).toFixed(2); // Supondo que a banca inicial seja 100

    // Zerar o contador de Losses quando ocorre um Win
    losses = 0;
    lossesSpan.textContent = losses;
    perdaSpan.textContent = "0.00";
});

// Botão "Loss"
const lossButton = document.getElementById("lossButton");
lossButton.addEventListener("click", () => {
    // Atualizar os valores
    banca -= valorEntrada; // Calcular o novo valor da banca após um "Loss"
    losses++; // Incrementar o contador de Losses

    // Atualizar o placar
    lossesSpan.textContent = losses;
    bancaAtualSpan.textContent = banca.toFixed(2);

    // Atualizar a Perda de acordo com o Gerenciamento escolhido
    const gerenciamento = gerenciamentoSelect.value;
    if (gerenciamento === "Conservador" && losses === 2) {
        valorEntrada += valorEntrada * 0.20;
    } else if (gerenciamento === "Moderado" && losses === 2) {
        valorEntrada += valorEntrada * 0.50;
    } else if (gerenciamento === "Agressivo" && losses === 2) {
        valorEntrada += valorEntrada * 0.75;
    } else if (losses >= 3) {
        valorEntrada += valorEntrada * 0.20; // Aumentar o valor da entrada após três Losses consecutivos
    }
    perdaSpan.textContent = (valorEntrada - 100).toFixed(2); // Supondo que a banca inicial seja 100
});

