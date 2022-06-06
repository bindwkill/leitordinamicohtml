export function Display(canvasReference) {
  const context = canvasReference.getContext("2d")
  const width = canvasReference.width
  const height = canvasReference.height

  context.textAlign = "center"

  return ({
    clear() {
      //Limpa toda a area do Canvas
      context.clearRect(0, 0, width, height)

      // Cria uma linha vermelha no meio do canvas
      context.strokeStyle = "red"
      context.moveTo(Math.floor(width / 2), 20)
      context.lineTo(Math.floor(width / 2), height - 20)
      context.stroke();
    },
    write(text) {
      //alinha texto e exibe
      const fontSize = Number(context.font.split('px')[0])
      const horizontalCenter = Math.floor(width / 2)
      const verticalCenter = Math.floor((height + fontSize) / 2)

      context.fillText(text, horizontalCenter, verticalCenter)
    },
    setFontSize(fontSize) {
      context.font = (fontSize + "px Arial");
    }
  })
}