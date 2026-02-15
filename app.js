let numerosRodados = []
let valMax = 10;
contTent = 1;
let numSecreto = numeroAleatorio();

function exibirTextoTela(tag, texto){
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.4; 
    window.speechSynthesis.speak(utterance); 
  } else {
      console.log("Web Speech API não suportada neste navegador.");
  }
}

function exibirMensagemInicial(){
  exibirTextoTela('h1', 'Jogo do numero Secreto');
  exibirTextoTela('p', `Escolha um numero entre 1 e ${valMax}`);
}

exibirMensagemInicial();

function numeroAleatorio(){
  let num = parseInt(Math.random()*valMax+1);
  let qtdElementos  = numerosRodados.length;

  if (qtdElementos == 10){
    numerosRodados = [];
  }

  console.log(numerosRodados)
  if (numerosRodados.includes(num)){
    return numeroAleatorio();
  }else{
    numerosRodados.push(num)
    return num;
  }
}

function limparCampo(){
  let chute = document.querySelector('Input');
  chute.value = '';
}

function verificarResp(){
  let chute = document.querySelector('Input').value;
  if (chute == numSecreto){
    exibirTextoTela('h1', "ACERTOU!");
    exibirTextoTela('p', `Você descobriu o numero! Com ${contTent} tentativa.`);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numSecreto){
      exibirTextoTela('p', 'Numero secreto é menor.')
    } else {
      exibirTextoTela('p', 'Numero secreto é maior')
    }
    contTent ++;
    limparCampo();
  }
}

function reiniciar(){
  numSecreto = numeroAleatorio();
  contTent = 1;
  limparCampo();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  exibirMensagemInicial();
}


