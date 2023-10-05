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
let perda =0;
let lucro =0;


// Multiplicadores de valor de entrada para cada nível de Loss
const multiplicadoresEntrada1 = [1,1, 1.2, 1.3, 1.2, 1.4, 1.3, 1.4, 1.3, 1.5, 1.4,1.6,1.5,1.7,1.9,1.7,1.9,1.8];
const multiplicadoresEntrada2 = [1, 1, 1.5, 1.6, 1.4, 1.7, 1.6, 1.8, 1.7, 1.9, 1.8, 2, 1.9, 2.1, 2.3, 2.1, 2.3, 2.2];
const multiplicadoresEntrada3 = [1, 1, 2, 2.2, 1.8, 2.5, 2.2, 2.8, 2.5, 3, 2.8, 3.5, 3, 3.8, 4, 3.8, 4, 4];



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

    entradainicial = parseFloat(document.getElementById('entradainicial').value);
}



//--------------------------------------Botões------------------------------------------------------------------
// Função para lidar com um clique no botão "Limpar"----------------------------------------------------
function Limpar() {
    valorBanca = 0;
    losses = 0;
    wins = 0;
    valorEntrada = 0;
    nivelloss = 0; 
    nivelwin = 0; 
    perda = 0;
    lucro = 0;

    
    atualizarnivelwin();
    atualizarnivelloss();
    atualizarvalorEntrada();
    atualizarPlacar();
    atualizarlucro ();
    atualizarperda();

}



// Função para lidar com um clique no botão "Win"
function win() {

    valorBanca += (valorEntrada * (payout / 100));
    wins++;
    nivelwin++;
    lucro += (valorEntrada * (payout / 100));
    perda -= (valorEntrada * (payout / 100));
    if (nivelwin == 2 ){
        nivelloss = 0;
        valorEntrada = +entradainicial;
      }



     
    
    atualizarPlacar();
    atualizarnivelwin();
    atualizarnivelloss();
    atualizarvalorEntrada();
    atualizarlucro ();
    atualizarperda();

   
}

// Função para lidar com um clique no botão "Loss"------------------------------------------------------------
function loss() {
     
    valorBanca -= valorEntrada;
    losses++;
    nivelloss++;
    nivelwin = 0;
    lucro -= valorEntrada;
    perda += valorEntrada;

  

// Ajustar o valor da entrada com base no nível de Loss e gerenciamento
if (gerenciamento === 'Conservador' && nivelloss < multiplicadoresEntrada1.length) {
  valorEntrada *= multiplicadoresEntrada1[nivelloss];

}
if (gerenciamento === 'Moderado' && nivelloss < multiplicadoresEntrada2.length) {
  valorEntrada *= multiplicadoresEntrada2[nivelloss];

}
if (gerenciamento === 'Agressivo' && nivelloss < multiplicadoresEntrada3.length) {
  valorEntrada *= multiplicadoresEntrada3[nivelloss];

}

    atualizarPlacar();
    atualizarnivelwin();
    atualizarnivelloss();
    atualizarvalorEntrada();
    atualizarlucro ();
    atualizarperda();
    
 
    }
    //--------Atualizar nivel win---------------------------------
function atualizarnivelwin() {
     document.getElementById('nivelwin').textContent = `Nivel win: ${nivelwin.toFixed(2)}`;

    
}
//------Atualizar nivel loss----------------------------------------

function atualizarnivelloss() {
    document.getElementById('nivelloss').textContent = `Nivel loss: ${nivelloss.toFixed(2)}`;  
}

//------Atualizar Lucro ---------------------------------------
function atualizarlucro() {
  document.getElementById('lucro').textContent = `Lucro/Perda: ${lucro.toFixed(2)}`; 
  
  // Adicionar classe 'negativo' se houver perda
  if (lucro < 0) {
    document.getElementById('lucro').classList.add('negativo');
} else {
    document.getElementById('lucro').classList.remove('negativo');
}

}



//------Atualizar perda ---------------------------------------

function atualizarperda() {
  document.getElementById('perda').textContent = `Lucro/Perda: ${perda.toFixed(2)}`;  
}

//--------------------Função para limpar o valor da entrada ou atualizar-----------------------
function atualizarvalorEntrada() {

     // Obter os valores do formulário
    let gerenciamento = document.getElementById('gerenciamento').value;
   
    // Ajustar o valor da entrada com base no nível de Loss e gerenciamento
    if (gerenciamento === 'Conservador' && nivelloss < multiplicadoresEntrada1.length) {
      valorEntrada *= multiplicadoresEntrada1[nivelloss];

  
  } 
  if (gerenciamento === 'Moderado' && nivelloss < multiplicadoresEntrada2.length) {
    valorEntrada *= multiplicadoresEntrada2[nivelloss];
  
  }
  if (gerenciamento === 'Agressivo' && nivelloss < multiplicadoresEntrada3.length) {
    valorEntrada *= multiplicadoresEntrada3[nivelloss];
  
  }
  
  else if((gerenciamento === 'Conservador' && nivelloss > multiplicadoresEntrada1.length)) {
      valorEntrada = +entradainicial;
  }
  else if((gerenciamento === 'Moderado' && nivelloss > multiplicadoresEntrada2.length)) {
    valorEntrada = +entradainicial;
}
else if((gerenciamento === 'Agressivo' && nivelloss > multiplicadoresEntrada3.length)) {
  valorEntrada = +entradainicial;
}
    
 // Exibir o valor da entrada atualizado
    document.getElementById('valorEntrada').textContent = `Valor da Entrada: ${valorEntrada.toFixed(2)}`;
    
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
