import { Display } from './display.js'

let textArray = [];//Vetor com todas as palavras do texto inserido
let Exec;// 'Execução' guarda referencia ao 'setInterval'
let paused; //flag para quando a execução estiver pausada

const canvas = Display(document.querySelector("[data-id=render]"));
const play_pauseButton = document.querySelector("[data-id=play_pauseButton]");//botão iniciar-pausar
const stopButton = document.querySelector("[data-id=stopButton]");//botão parar
const clearButton = document.querySelector("[data-id=clearButton]");//botão limpar
const helpButton = document.querySelector("[data-id=helpButton]");//botão help

const fontSizeComboBox = document.querySelector("[data-id=font_sizes]");//campo tamanho da fonte
const wordsPerMinute = document.querySelector("[data-id=words_per_minute]");//campo velocidade das palavras
const inputText = document.querySelector("[data-id=inputText]");//textarea

//inicializa os tamanhos de fonte como múltiplos de 16px
(function () {
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.text = i * 16;
    fontSizeComboBox.add(option);
  }
  //tamanho inicial padrão
  fontSizeComboBox.selectedIndex = "4";
  canvas.setFontSize(fontSizeComboBox.value);
})();

canvas.clear();
canvas.write("Hello World");
toggleActiveElements(false);

//valida o valor digitado para 'palavras por minuto'
function valideWordSpeed() {
  if (wordsPerMinute.value > 0) {
    return 60000 / wordsPerMinute.value;
  }
  //velocidade padrão
  wordsPerMinute.value = 250;
  return 250;
}

//inicia a execução
function runText() {
  const timing = valideWordSpeed();
  pauseText(false);
  textArray = inputText.value.split(" ");

  //por algum motivo, sempre tem pelo menos 1 elemento nesse vetor...
  if (textArray.length > 1) {
    toggleActiveElements(true);

    Exec = setInterval(shiftArrayText, timing);
    return
  }

  canvas.clear();
  canvas.write("Hello World");
  play_pauseButton.setAttribute("src", "img/play.png");
}

//exibe uma palavra e remove ela da fila
const shiftArrayText = () => {
  if (textArray.length > 0) {
    if (!paused) {
      canvas.clear();
      canvas.write(textArray.shift());
    }
    return
  }
  stopText();
}

//muda a flag de pause
function pauseText(value = !paused) {
  paused = value;
}

function togglePlay() {
  if (!Exec) {
    play_pauseButton.setAttribute("src", "img/pause.png");
    runText();
    return
  }
  pauseText()
  const iconSource = paused ? "img/play.png" : "img/pause.png";
  play_pauseButton.setAttribute("src", iconSource);
}

//para completamente a execução
function stopText() {
  clearInterval(Exec);
  Exec = null;
  pauseText(true)
  play_pauseButton.setAttribute("src", "img/play.png");
  toggleActiveElements(false);
  if (textArray.length > 1) {
    canvas.clear();
    canvas.write("Hello World");
    textArray = [];
  }
}

//limpa o textarea
function clearText() {
  inputText.textContent = "";
  wordsPerMinute.value = 250;
  canvas.clear();
  canvas.write("Hello World");
}

//habilita/desabilita todos os elementos para a execução
function toggleActiveElements(isRunning) {
  stopButton.disabled = !isRunning;
  clearButton.disabled = isRunning;
  helpButton.disabled = isRunning;
  wordsPerMinute.disabled = isRunning;
  fontSizeComboBox.disabled = isRunning;
  inputText.disabled = isRunning;
}

function helpText() {
  inputText.textContent = "Esta técnica permite que você não precise deslocar os olhos enquanto lê, o que permite uma leitura muito mais rápida que o comum, sem deixar de compreender o que está sendo lido."
  togglePlay();
}

play_pauseButton.addEventListener('click', togglePlay)
stopButton.addEventListener('click', stopText)
clearButton.addEventListener('click', clearText)
helpButton.addEventListener('click', helpText)

fontSizeComboBox.addEventListener('change', event => {
  canvas.setFontSize(event.target.value);
  canvas.clear();
  canvas.write("Hello World");
})