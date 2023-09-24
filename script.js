// Variáveis para armazenar os valores
let valorBanca = 0;
let porcentagemEntrada = 0;
let payout = 0;
let valorEntrada = 0;
let wins = 0;
let losses = 0;
let gerenciamento = "";
let nivelwin = 0;
let nivelloss =0;
let entradainicial = 0; 

// Função para calcular a entrada
function calcularEntrada() {
    // Obter os valores do formulário
    valorBanca = parseFloat(document.getElementById('banca').value);
    porcentagemEntrada = parseFloat(document.getElementById('porcentagem').value);
    payout = parseFloat(document.getElementById('payout').value);

    // Calcular o valor da entrada
    valorEntrada = (valorBanca * (porcentagemEntrada / 100)).toFixed(2);
    entradainicial = valorEntrada;

    // Exibir o valor da entrada no local designado
    document.getElementById('valorEntrada').textContent = `Valor da Entrada: ${valorEntrada}`;
}

//--------------------------------------Botões------------------------------------------------------------------
// Função para lidar com um clique no botão "Limpar"----------------------------------------------------
function Limpar() {
    valorBanca = 0;
    losses = 0;
    wins = 0;
    valorEntrada = 0;
    atualizarPlacar();
    atualizarvalorEntrada();
}



// Função para lidar com um clique no botão "Win"
function win() {
    valorBanca += (valorEntrada * (payout / 100));
    wins++;
    nivelwin++;
    if (nivelwin == 2 ){
        nivelloss = 0;
        valorEntrada = entradainicial;
    }
    atualizarPlacar();
    atualizarnivelwin()
    atualizarnivelloss()
}

// Função para lidar com um clique no botão "Loss"------------------------------------------------------------
function loss() {
     
    valorBanca -= valorEntrada
    losses++;
    nivelloss++;
    nivelwin = 0;
    
    
    atualizarPlacar();
    atualizarvalorEntrada();
    atualizarnivelwin()
    atualizarnivelloss()

    
    }
    

//--------Atualizar nivel win---------------------------------
function atualizarnivelwin() {

 document.getElementById('nivelwin').textContent = `Nivel win: ${nivelwin.toFixed(2)}`;

    
}




//------Atualizar nivel loss----------------------------------------

function atualizarnivelloss() {
 document.getElementById('nivelloss').textContent = `Nivel loss: ${nivelloss.toFixed(2)}`;


    
}




//--------------------Função para limpar o valor da entrada ou atualizar-----------------------
function atualizarvalorEntrada() {

     // Obter os valores do formulário
    let gerenciamento = document.getElementById('gerenciamento').value;
   
    // Atualizar o valor da entrada com base no gerenciamento e nas perdas
    if (gerenciamento === "Conservador" || nivelloss > 1 ) {
        valorEntrada *= 1.2;
         // Exibir o valor da entrada atualizado
    document.getElementById('valorEntrada').textContent = `Valor da Entrada: ${valorEntrada.toFixed(2)}`;
    } 

    else {
        // Exibir o valor da entrada atualizado
        document.getElementById('valorEntrada').textContent = `Valor da Entrada: ${valorEntrada.toFixed(2)}`;
    }
    
}











//--------------------------PLACAR--------------------------------------------------------------
// Função para atualizar o placar
function atualizarPlacar() {
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    document.getElementById('losses').textContent = `Losses: ${losses}`;
    document.getElementById('bancaAtual').textContent = `Valor da Banca: ${valorBanca.toFixed(2)}`;
   
}

//--------------------------Adição de botões-----------------------------------------------

// Associar funções aos botões
document.getElementById('calcularEntrada').addEventListener('click', calcularEntrada);
document.getElementById('winButton').addEventListener('click', win);
document.getElementById('lossButton').addEventListener('click', loss);
document.getElementById('Limpar').addEventListener('click', Limpar);
