let snake;
let columns;
let rows;
let food;
let score = 0
let gameHeight = 400

function setup() {
  columns = 20
  rows = 20
  createCanvas(400, 480);
  snake = new Snake(2,1)
  food = new Food()
  button = createButton('Restart');
  frameRate(10);
}

function draw() {
  background(255);
  fill(255)  
  stroke(0)
  rect(0,0,width,gameHeight)
  food.show()
  snake.move()
  snake.show()
  if(snake.eat(food)){
    food.reset()
    score+=1
  }
  textSize(32);
  fill(0)
  text(`Score: ${score}`, 20, 450);  
  if(snake.hasCrashed()){
    noLoop() 
    button.position(width/2 -40, gameHeight/2);
    button.mousePressed(()=>{        
      button.position(-300, -300);
      snake = new Snake(2,1)
      food = new Food()
      loop()
      score = 0
    })
  }
}

class Food{
  constructor(){
    this.posX = floor(random(width/columns))
    this.posY = floor(random(gameHeight/rows))
  }
  
  show(){
    fill(255,0,0)
    strokeWeight(2);
    stroke(0)
    rect(this.posX*(width/columns),this.posY*(width/columns),(width/columns), (width/columns))
  }
  
  reset(){
    this.posX = floor(random(width/columns))
    this.posY = floor(random(gameHeight/rows))
  }
}

class Snake {
  constructor(initialPositionX, initialPositionY){
    this.positions = [{x:initialPositionX,
                 y:initialPositionY,
                  direction:'right'}]
    this.length = this.positions.length
    this.velocity = {x:0,y:0}
    this.heading = 'right'
  }
  
  show(posX,posY){    
    for(let i=0; i < width; i+=(width/columns)){
      for(let j = 0; j < gameHeight; j+=(gameHeight/rows)){    
        // fill(255,255,255)
        // rect(i, j,(width/columns), (gameHeight/rows));
        for(let k = 0; k < this.length;k++){               
          if(this.positions[k].x*(width/columns)== i && 
             this.positions[k].y*(gameHeight/rows) == j){
            fill(0,0,255)
            noStroke()
            rect(this.positions[k].x*(width/columns), this.positions[k].y*(gameHeight/rows), 
               (width/columns), (gameHeight/rows)); 
          }             
        }         
      }
    }
  }  
  
  move(){
    let positionsCopy = JSON.parse(JSON.stringify(this.positions))
    for(let i = 0; i < this.length;i++){
      if(i==0){              
        this.positions[i].x += this.velocity.x
        this.positions[i].y += this.velocity.y
      }
      else{
        this.positions[i].x = positionsCopy[i-1].x
        this.positions[i].y = positionsCopy[i-1].y
        this.positions[i].direction = positionsCopy[i-1].direction
      }
    }  
  }
  
  eat(food){    
    if(this.positions[0].x == food.posX && this.positions[0].y == food.posY){      
      if(this.positions[this.length -1].direction == 'down'){
        this.positions.push({
          x:this.positions[this.length -1].x,
          y:this.positions[this.length -1].y - 1,
          direction : 'down'
        })
      }
      else if(this.positions[this.length -1].direction == 'up'){
        this.positions.push({
          x:this.positions[this.length -1].x,
          y:this.positions[this.length -1].y + 1,
          direction : 'up'
        })
      }
      else if(this.positions[this.length -1].direction == 'right'){
        this.positions.push({
          x:this.positions[this.length -1].x - 1,
          y:this.positions[this.length -1].y,
          direction : 'right'
        })
      }
      else if(this.positions[this.length -1].direction == 'left'){
        this.positions.push({
          x:this.positions[this.length -1].x + 1,
          y:this.positions[this.length -1].y,
          direction : 'left'
        })
      }
      this.length = this.positions.length
      return true
    }
    else return false
  }
  
  hasCrashed(){
    if(this.length>=4){
      for(let i = 3; i < this.length; i++){
        if(this.positions[0].x == this.positions[i].x && 
           this.positions[0].y == this.positions[i].y){
          return true
        }
      }
    }
  
    if(this.positions[0].x > (width/columns)-1 || this.positions[0].x < 0 ||
       this.positions[0].y > (gameHeight/rows)-1 || this.positions[0].y < 0){
      return true
    }
    else return false
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if(snake.heading != 'down'){
      snake.velocity = {x:0,y:-1}
      snake.heading = 'up'
      snake.positions[0].direction = 'up'
    }    
  } 
  else if (keyCode === DOWN_ARROW) {
    if(snake.heading != 'up'){
      snake.velocity = {x:0,y:1}
      snake.heading = 'down'
      snake.positions[0].direction = 'down'
    }
  }
  if (keyCode === LEFT_ARROW) {
    if(snake.heading != 'right'){
      snake.velocity = {x:-1,y:0}
      snake.heading = 'left'
      snake.positions[0].direction = 'left'
    }
  } 
  else if (keyCode === RIGHT_ARROW) {
    if(snake.heading != 'left'){
      snake.velocity = {x:1,y:0}
      snake.heading = 'right'
      snake.positions[0].direction = 'right'
    }
  }  
}