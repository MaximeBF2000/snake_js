console.log("javascript is loaded")
const d = document

// DOM
const canvas = d.querySelector("#canvas")
const ctx = canvas.getContext("2d")

const canvasWidth = canvas.clientWidth
const canvasHeight = canvas.clientHeight

const cube_size = 25

class Apple {
  constructor(){
    this.x = 0
    this.y = 0
  }

  generate(){
    // Générer une pomme à une position aléatoire sur le canvas
    this.x = Math.floor(Math.random() * (canvasWidth - cube_size))
    this.y = Math.floor(Math.random() * (canvasHeight - cube_size))
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, cube_size, cube_size)
  }

  renew(){
    // Supprimer l'ancienne pomme et en générer une nouvelle
    ctx.clearRect(this.x, this.y, cube_size + 2, cube_size + 2)
    this.generate()
  }

}

class Snake {
  constructor(color, size, speed){
    this.color = color
    this.size = size
    this.x = 0
    this.y = 0
    this.speed = speed
    this.changeDir = false
  }

  spawn(){
    // Faire apparaitre la première instance du snake en (0, 0)
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  move(direction){
    const intervalle = setInterval(() => {
      // Sauvegarde de la position du snake
      const old_x = this.x
      const old_y = this.y

      // Déplacements du snake
      switch(direction){
        // Droite
        case "r":
          if(this.x < canvasWidth){
            for(let i = 0; i <= cube_size; i++){
              this.x += 1
              i++
            }
          } 
          else this.x = 0
          break
        // Gauche
        case "l":
          if(this.x > 0){
            for(let i = 0; i <= cube_size; i++){
              this.x -= 1
              i++
            }
          }
          else this.x = canvasWidth
          break
        // Bas
        case "d":
          if(this.y < canvasHeight){
            for(let i = 0; i <= cube_size; i++){
              this.y += 1
              i++
            }
          } 
          else this.y = 0
          break
        // Haut
        case "u":
          if(this.y > 0){
            for(let i = 0; i <= cube_size; i++){
              this.y -= 1
              i++
            }
          } 
          else this.y = canvasHeight
          break
      }
      // Vérifier si le snake est au niveau de la pomme
      if(this.checkApple(apple)){
        this.eat()
        ctx.fillStyle = this.color
      }

      // Supprimer l'ancienne position du snake
      ctx.clearRect(old_x - 1, old_y - 1, cube_size + 2, cube_size + 2)

      // Dessiner la nouvelle position du snake
      ctx.fillRect(this.x, this.y, this.size, this.size)

      // Stoper l'intervalle du mouvement pour changer la direction du snake
      if(this.changeDir){
        clearInterval(intervalle)
        this.changeDir = false
      }
    }, this.speed)
  }

  changeDirection(newDirection){
    this.changeDir = true
    setTimeout(() => this.move(newDirection), 0)
  }

  checkApple(apple){
    if(
      // Le snake est au même coordonées que la pomme ?
      this.x >= apple.x && this.x <= apple.x + cube_size
      && this.y >= apple.y && this.y <= apple.y + cube_size
      || this.x + cube_size >= apple.x && this.x + cube_size <= apple.x + cube_size
      && this.y + cube_size >= apple.y && this.y + cube_size <= apple.y + cube_size
    ) return true
    else return false
  }

  eat(){
    apple.renew()
  }

  init(){
    // Initialiser le snake avec la direction vers la droite
    this.spawn()
    this.move("r")
  }

}


// Créer les instances du jeu
const snake = new Snake("green", cube_size, 70)
const apple = new Apple()
apple.generate()
snake.init()


// Détection des flèches du clavier
window.addEventListener("keyup", event => {
  switch(event.keyCode){
    case 37:
      snake.changeDirection("l")
      break
    case 38:
      snake.changeDirection("u")
      break
    case 39:
      snake.changeDirection("r")
      break
    case 40:
      snake.changeDirection("d")
      break
  }
})