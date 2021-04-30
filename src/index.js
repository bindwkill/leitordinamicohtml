var hello = "Hello World" //Texto de boas vindas
var timing; //velocidade com que as palavras são trocadas na tela
var textVector = [];//Vetor com todas as palavras do texto inserido
var ctx;// guarda o 'contexto' especifico do canvas do html
var Exec;// 'Execução' guarda referencia ao 'setInterval'
var width; // guarda a largura do canvas
var height; // guarda a altura do canvas
var fontSize; //tamanho de fonte
var paused; //flag para quando a execução estiver pausada

//inicia a aplicação da pagina
function init() {
  let canvas = document.getElementById("render");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  fontOptions();
  clearCanvas();
  writeCanvas(hello);
  onRunDisabledElements(false);
}

//limpa o canvas
function clearCanvas() {
  //Limpa toda a area do Canvas
  ctx.clearRect(0, 0, width, height);
  // Cria uma linha vermelha no meio do canvas
  ctx.strokeStyle = "red";
  ctx.moveTo(Math.floor(width / 2), 60);
  ctx.lineTo(Math.floor(width / 2), height - 60);
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
  paused = false;
  textVector = document.getElementById("fonte").value.split(" ");
  //por algum motivo, sempre tem pelo menos 1 elemento nesse vetor...
  if (textVector.length > 1) {
    onRunDisabledElements(true);
    Exec = setInterval("scrollText()", timing);
  }
  else {
    clearCanvas();
    writeCanvas(hello);
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
function pauseText() {
  paused = !paused;
}

//para completamente a execução
function stopText() {
  clearInterval(Exec);
  onRunDisabledElements(false);
  if (textVector.length > 1) {
    clearCanvas();
    writeCanvas(hello);
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
  document.getElementById("fonte").value = "";
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
  document.getElementById("run").disabled = isRunning;//botão iniciar
  document.getElementById("clear").disabled = isRunning;//botão limpar

  document.getElementById("stop").disabled = !isRunning;//botão parar
  document.getElementById("pause").disabled = !isRunning;//botão pausar

  document.getElementById("wpm").disabled = isRunning;//campo 'palavras por min'
  document.getElementById("fonts").disabled = isRunning;//campo tamanho da fonte
  document.getElementById("fonte").disabled = isRunning;//textarea
}