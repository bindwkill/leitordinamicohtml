const hello = "Hello World" //Texto de boas vindas
let timing; //velocidade com que as palavras são trocadas na tela
let textVector = [];//Vetor com todas as palavras do texto inserido
let Exec;// 'Execução' guarda referencia ao 'setInterval'
let fontSize; //tamanho de fonte
let paused; //flag para quando a execução estiver pausada

const canvas = document.getElementById("render");
const ctx = canvas.getContext("2d");// guarda o 'contexto' especifico do canvas do html
const width = canvas.width;// guarda a largura do canvas
const height = canvas.height;// guarda a altura do canvas

const play_pauseButton = document.getElementById("play_pauseButton")//botão iniciar-pausar
const stopButton = document.getElementById("stopButton")//botão parar
const clearButton = document.getElementById("clearButton")//botão limpar
const helpButton = document.getElementById("helpButton")//botão limpar

const wordSpeed = document.getElementById("wpm")//campo 'palavras por min'
const fontSizeElement = document.getElementById("fonts");//campo tamanho da fonte
const textArea = document.getElementById("fonte")//textarea

fontOptions();
clearCanvas();
writeCanvas(hello);
onRunDisabledElements(false);

//limpa o canvas
function clearCanvas() {
  //Limpa toda a area do Canvas
  ctx.clearRect(0, 0, width, height);
  // Cria uma linha vermelha no meio do canvas
  ctx.strokeStyle = "red";
  ctx.moveTo(Math.floor(width / 2), 20);
  ctx.lineTo(Math.floor(width / 2), height - 20);
  ctx.stroke();
}

//escreve no canvas
function writeCanvas(texto) {
  //alinha texto e exibe
  ctx.font = (fontSize + "px Arial");
  ctx.textAlign = "center";
  ctx.fillText(texto, Math.floor(width / 2), Math.floor(height / 2) + Math.floor(fontSize / 3));
}

//valida o valor digitado para 'palavras por minuto'
//wpm words per minute - palavras por minuto
function valideWpm() {
  if (document.getElementById("wpm").value > 0) {
    timing = 60000 / document.getElementById("wpm").value;
  }
  else {
    timing = 250;//velocidade padrão
    document.getElementById("wpm").value = timing;
  }
}

//inicia a execução
function runText() {
  valideWpm();
  pauseText(false);
  textVector = document.getElementById("fonte").value.split(" ");
  //por algum motivo, sempre tem pelo menos 1 elemento nesse vetor...
  if (textVector.length > 1) {
    onRunDisabledElements(true);
    Exec = setInterval("scrollText()", timing);
  }
  else {
    clearCanvas();
    writeCanvas(hello);
    play_pauseButton.setAttribute("src", "img/play.png")
  }
}

//faz o texto avançar
function scrollText() {
  if (!paused) {
    if (textVector.length > 0) {
      clearCanvas();
      writeCanvas(textVector.shift());
    }
    else {
      stopText();
    }
  }
}

//muda a flag de pause
function pauseText(value = !paused) {
  paused = value;
}

function togglePlay() {
  if (!Exec) {
    play_pauseButton.setAttribute("src", "img/pause.png")
    runText()
  }
  else {
    pauseText()
    if (paused) {
      play_pauseButton.setAttribute("src", "img/play.png")
    }
    else {
      play_pauseButton.setAttribute("src", "img/pause.png")
    }
  }
}



//para completamente a execução
function stopText() {
  clearInterval(Exec);
  Exec = null
  pauseText(true)
  play_pauseButton.setAttribute("src", "img/play.png")
  onRunDisabledElements(false);
  if (textVector.length > 1) {
    clearCanvas();
    writeCanvas(hello);
    textVector = []
  }
}

//inicializa os tamanhos de fonte como múltiplos de 16px
function fontOptions() {
  let box = document.getElementById("fonts")
  let option;
  for (let i = 1; i <= 10; i++) {
    option = document.createElement("option")
    option.text = i * 16;
    box.add(option);
  }
  box.selectedIndex = "4";//tamanho inicial padrão;
  changeFontSize();
}

//limpa o textarea
function clearText() {
  textArea.textContent = "";
  clearCanvas();
  writeCanvas(hello);
}

//função chamada quando troca o tamanho de fonte
function changeFontSize() {
  fontSize = document.getElementById("fonts").value;
  clearCanvas();
  writeCanvas(hello);
}

//habilita/desabilita todos os elementos para a execução
function onRunDisabledElements(isRunning) {
  stopButton.disabled = !isRunning;

  clearButton.disabled = isRunning;
  helpButton.disabled = isRunning;
  wordSpeed.disabled = isRunning;
  fontSizeElement.disabled = isRunning;
  textArea.disabled = isRunning;
}

function helpText() {
  console.debug("passou por aqui")
  textArea.textContent = "Esta técnica permite que você não precise deslocar os olhos enquanto lê, o que permite uma leitura muito mais rápida que o comum, sem deixar de compreender o que está sendo lido."
  togglePlay()
}