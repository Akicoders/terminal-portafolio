export const snake = () => {
  interface Position {
    x: number
    y: number
  }

  interface SnakeBody {
    position: [number, number][]
  }

  interface Snake {
    body: [number, number][]
    direction: string
    ateApple: boolean
  }

  interface Apple {
    position: number[]
  }

  const fontFile = new FontFace(
    "Inconsolata",
    'url(https://fonts.gstatic.com/s/inconsolata/v31/QlddNThLqRwH-OJ1UHjlKENVzlm-WkL3GZQmAwPyya15.woff2) format("woff2")',
    {stretch: "50% 200%"},
  )

  document.fonts.add(fontFile)

  const canvasWidth: number = 900
  const canvasHeight: number = 600
  const blockSize: number = 30
  let ctx: CanvasRenderingContext2D
  const delay: number = 100
  let xCoord: number = 0
  let yCoord: number = 0
  let snakee: Snake
  let applee: Apple
  const widthInBlocks: number = canvasWidth / blockSize
  const heightInBlocks: number = canvasHeight / blockSize
  let score: number
  let timeOut: any

  function init(): void {
    const canvas: HTMLCanvasElement = document.createElement("canvas")
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.border = "10px solid #202124"
    canvas.style.margin = "50px auto"
    canvas.style.display = "block"
    canvas.style.backgroundColor = "#70B68A"
    document.getElementById("form").appendChild(canvas)
    ctx = canvas.getContext("2d")
    snakee = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      "right",
    )
    applee = new Apple([10, 10])
    score = 0
    refreshCanvas()
  }

  function refreshCanvas(): void {
    snakee.advance()
    if (snakee.checkCollision()) {
      gameOver()
    } else {
      if (snakee.isEatingApple(applee)) {
        score++
        snakee.ateApple = true
        do {
          applee.setNewPosition()
        } while (applee.isOnSnake(snakee))
      }
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      drawScore()
      snakee.draw()
      applee.draw()
      timeOut = setTimeout(refreshCanvas, delay)
    }
  }

  function gameOver(): void {
    ctx.save()
    ctx.font = "bold 70px sans-serif"
    ctx.fillStyle = "#202124"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.strokeStyle = "#70B68A"
    ctx.lineWidth = 5
    const centreX: number = canvasWidth / 2
    const centreY: number = canvasHeight / 2
    ctx.strokeText("Game Over", centreX, centreY - 180)
    ctx.fillText("Game Over", centreX, centreY - 180)
    ctx.font = "bold 30px sans-serif"
    ctx.strokeText("Press space to try again", centreX, centreY - 120)
    ctx.fillText("Press space to try again", centreX, centreY - 120)
    ctx.restore()
  }

  function restart(): void {
    snakee = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      "right",
    )
    applee = new Apple([10, 10])
    score = 0
    clearTimeout(timeOut)
    refreshCanvas()
  }

  function drawScore(): void {
    ctx.save()
    ctx.font = "bold 20px sans-serif"
    ctx.fillStyle = "#70B68A"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const centreX: number = canvasWidth / 18
    const centreY: number = canvasHeight / 1.03
    ctx.fillText("Score:" + score.toString(), centreX, centreY)
    ctx.restore()
  }

  function drawBlock(
    ctx: CanvasRenderingContext2D,
    position: [number, number],
  ): void {
    var x: number = position[0] * blockSize
    var y: number = position[1] * blockSize
    ctx.fillRect(x, y, blockSize, blockSize)
  }

  class Snake {
    body: [number, number][]
    direction: string
    ateApple: boolean

    constructor(body: [number, number][], direction: string) {
      this.body = body
      this.direction = direction
      this.ateApple = false
    }

    draw(): void {
      ctx.save()
      ctx.fillStyle = "#202124"
      for (var i = 0; i < this.body.length; i++) {
        drawBlock(ctx, this.body[i])
      }
      ctx.restore()
    }

    advance(): void {
      var nextPosition: any = this.body[0].slice()
      switch (this.direction) {
        case "left":
          nextPosition[0] -= 1
          break
        case "right":
          nextPosition[0] += 1
          break
        case "down":
          nextPosition[1] += 1
          break
        case "up":
          nextPosition[1] -= 1
          break
        default:
          throw "invalid direction"
      }
      this.body.unshift(nextPosition)
      if (!this.ateApple) this.body.pop()
      else this.ateApple = false
    }

    setDirection(newDirection: string): void {
      var allowedDirections: string[]
      switch (this.direction) {
        case "left":
        case "right":
          allowedDirections = ["up", "down"]
          break
        case "down":
        case "up":
          allowedDirections = ["left", "right"]
          break
        default:
          throw "invalid direction"
      }
      if (allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection
      }
    }

    checkCollision(): boolean {
      var wallCollision: boolean = false
      var snakeCollision: boolean = false
      var head: any = this.body[0]
      var rest: any = this.body.slice(1)
      var snakeX: number = head[0]
      var snakeY: number = head[1]
      var minX: number = 0
      var minY: number = 0
      var maxX: number = widthInBlocks - 1
      var maxY: number = heightInBlocks - 1
      var isNotBetweenHorizontalWalls: boolean = snakeX < minX || snakeX > maxX
      var isNotBetweenVerticalWalls: boolean = snakeY < minY || snakeY > maxY

      if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
        wallCollision = true

      for (var i = 0; i < rest.length; i++) {
        if (snakeX === rest[i][0] && snakeY === rest[i][1])
          snakeCollision = true
      }

      return wallCollision || snakeCollision
    }

    isEatingApple(appleToEat: Apple): boolean {
      var head: any = this.body[0]
      if (
        head[0] === appleToEat.position[0] &&
        head[1] === appleToEat.position[1]
      )
        return true
      else return false
    }
  }

  class Apple {
    position: number[]

    constructor(position: number[]) {
      this.position = position
    }

    draw(): void {
      ctx.save()
      ctx.fillStyle = "#202124"
      ctx.beginPath()
      var sideLength = blockSize // Adjust this to control the size of the diamond
      var x = this.position[0] * blockSize + sideLength / 2
      var y = this.position[1] * blockSize + sideLength / 2

      ctx.moveTo(x, y - sideLength / 2)
      ctx.lineTo(x + sideLength / 2, y)
      ctx.lineTo(x, y + sideLength / 2)
      ctx.lineTo(x - sideLength / 2, y)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    setNewPosition(): void {
      var newX: number = Math.round(Math.random() * (widthInBlocks - 1))
      var newY: number = Math.round(Math.random() * (heightInBlocks - 1))
      this.position = [newX, newY]
    }

    isOnSnake(snakeToCheck: Snake): boolean {
      var isOnSnake: boolean = false
      for (var i = 0; i < snakeToCheck.body.length; i++) {
        if (
          this.position[0] === snakeToCheck.body[i][0] &&
          this.position[1] === snakeToCheck.body[i][1]
        ) {
          isOnSnake = true
        }
      }
      return isOnSnake
    }
  }

  document.onkeydown = function handleKeyDown(e: KeyboardEvent): void {
    var key: number = e.keyCode
    var newDirection: string
    switch (key) {
      case 37:
        newDirection = "left"
        break
      case 38:
        newDirection = "up"
        break
      case 39:
        newDirection = "right"
        break
      case 40:
        newDirection = "down"
        break
      case 32:
        restart()
        return
      default:
        return
    }
    snakee.setDirection(newDirection)
  }

  init()
}
