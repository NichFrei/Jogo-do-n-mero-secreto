let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {

    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {

    exibirTexto("h1", "Jogo do número secreto.");
    exibirTexto("p", `Insira o seu chute entre 1 e ${numeroLimite}.`);
}

function gerarNumero() {

   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeNumerosSorteados = listaDeNumerosSorteados.length;

   if(quantidadeDeNumerosSorteados == numeroLimite) {

        listaDeNumerosSorteados = [];
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)) {

        return gerarNumero();

   } else {

        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

function limparCampo() {

    chute = document.querySelector("input");
    chute.value = "";
}

function verificarChute() {

    let chute = document.querySelector("input").value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;

    if(chute == numeroSecreto) {

        exibirTexto("h1", "Acertou!");
        exibirTexto("p", mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled");

    } else if(chute > numeroSecreto) {

        exibirTexto("p", "O número é menor que seu chute!");

    } else {

        exibirTexto("p", "O número é maior que seu chute!");
    }

    limparCampo();
    tentativas++
}

function reiniciarJogo() {

   numeroSecreto = gerarNumero();
   limparCampo();
   tentativas = 1;
   exibirMensagemInicial();
   document.getElementById("reiniciar").setAttribute("disabled", true);
}

exibirMensagemInicial();