document.addEventListener('DOMContentLoaded', function () {
    // Variáveis para armazenar valores
    let valorBanca = 0;
    let valorEntrada = 0;
    let payout = 0;
    let tipoGerenciamento = 'Conservador';
    let wins = 0;
    let losses = 0;
    let perda = 0;

    // Elementos HTML
    const form = document.getElementById('entradaForm');
    const bancaInput = document.getElementById('banca');
    const porcentagemInput = document.getElementById('porcentagem');
    const payoutInput = document.getElementById('payout');
    const gerenciamentoInput = document.getElementById('gerenciamento');
    const winButton = document.getElementById('winButton');
    const lossButton = document.getElementById('lossButton');
    const winsDisplay = document.querySelector('#wins span');
    const lossesDisplay = document.querySelector('#losses span');
    const bancaAtualDisplay = document.querySelector('#bancaAtual span');
    const lucroDisplay = document.querySelector('#lucro span');
    const perdaDisplay = document.querySelector('#perda span');

    // Função para calcular o valor da entrada
    const calcularEntrada = () => {
        valorBanca = parseFloat(bancaInput.value);
        const porcentagemEntrada = parseFloat(porcentagemInput.value) / 100;
        payout = parseFloat(payoutInput.value) / 100;
        valorEntrada = valorBanca * porcentagemEntrada;
    };

    // Função para atualizar o placar
    const atualizarPlacar = () => {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        bancaAtualDisplay.textContent = valorBanca.toFixed(2);
        lucroDisplay.textContent = (valorBanca - perda - 100).toFixed(2); // Subtrai 100 para mostrar o lucro relativo ao valor inicial (100)
        perdaDisplay.textContent = perda.toFixed(2);
    };

    // Função para atualizar a banca após um Win
    const win = () => {
        valorBanca += (valorEntrada * payout);
        wins++;
        atualizarPlacar();
    };

    // Função para atualizar a banca após um Loss
    const loss = () => {
        valorBanca -= valorEntrada;
        losses++;
        perda += valorEntrada;

        // Aplicar estratégia de gerenciamento
        if (tipoGerenciamento === 'Conservador') {
            if (losses === 2) {
                valorEntrada = (valorEntrada * 0.2) + valorEntrada;
            } else if (losses === 3) {
                valorEntrada = (perda * 0.2) + perda;
            }
        } else if (tipoGerenciamento === 'Moderado') {
            if (losses === 2) {
                valorEntrada = (valorEntrada * 0.5) + valorEntrada;
            } else if (losses === 3) {
                valorEntrada = (perda * 0.5) + perda;
            }
        } else if (tipoGerenciamento === 'Agressivo') {
            if (losses === 2) {
                valorEntrada = (valorEntrada * 0.75) + valorEntrada;
            } else if (losses === 3) {
                valorEntrada = (perda * 0.75) + perda;
            }
        }

        atualizarPlacar();
    };

    // Manipular envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        calcularEntrada();
        atualizarPlacar();
    });

    // Manipular clique no botão Win
    winButton.addEventListener('click', function () {
        win();
    });

    // Manipular clique no botão Loss
    lossButton.addEventListener('click', function () {
        loss();
    });

    // Atualizar tipo de gerenciamento
    gerenciamentoInput.addEventListener('change', function () {
        tipoGerenciamento = gerenciamentoInput.value;
    });
});
