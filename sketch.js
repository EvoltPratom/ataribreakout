var gameOver;
var bll;
var slid;
var obsPositions;
var cnv;
var score;

// let img;
// function preload() {
//   img = loadImage('assets/test.jpg');
// }

function getObsPos(){
  return obsPositions
}
function incScore(){
  score += 1
  select("#scorecard").html("Score :"+score)
}

function setup() {
  score = 0
  titleh1 = createElement("h1","Atari Breakout")
  titleh1.center("horizontal")

  cnv = createCanvas(400, 400);
  cnv.position(400,200)
  cnv.center("horizontal")

  scorecard = createElement("h2","Score :"+ score)
  scorecard.id("scorecard")
  scorecard.position(400,600)
  scorecard.center("horizontal")
  // scorecard.attribute("color","#white")
  gameOver=false
  // frameRate(30)
  
  bll = new ball(55,350,-1,-1)
  slid = new slider()
  generateObstacles()
  // console.log(obsPositions)

}

function draw() {
  background(51);
  renderObstacles()
  
  if (gameOver == true ){
    console.log("Game Over!!")

    // noLoop()
  }
  
  ballSliderCollide(bll, slid) 
  
  bll.update()
  bll.show()
  
  slid.update()
  slid.show()
  
  
  if (bll.x>400 || bll.x<0){
    bll.xspeed *= -1
  }
  
  if (bll.y<0){
    bll.yspeed *= -1
  }
  
  if (bll.y >400){
    gameOver = true
  }

}

function ball(x,y,xv=1,yv=0){

  this.x = x
  this.y = y
  this.rad = 10
  this.xspeed = xv
  this.yspeed = yv
  this.color = "#fae"
  
  this.update = function(){
    this.x+=this.xspeed
    this.y+=this.yspeed
  }
  
  this.show = function (){
    fill(this.color)
    circle(this.x,this.y, this.rad)
  }
  
}

function slider(){
  this.x = 0
  this.y = 400-15
  this.width = 60
  this.height = 15
  this.color = "cyan"
  
  this.show = function(){
    fill(this.color)
    rect(this.x,this.y,this.width,this.height)
  }
  this.update = function(){
    this.x = +mouseX
    // console.log(this.x, 55555)
    if (this.x+this.width > 400){
      this.x = 400-this.width
    }
    if (this.x<0){
      this.x = 0
    }
  }
}

function ballSliderCollide(balll, sliderrr){

  var smid = sliderrr.x + sliderrr.width/2
  var sq1 = sliderrr.x + 0.25 * sliderrr.width
  var sq3 = smid + sq1
  var send = sliderrr.x + sliderrr.width
  if ((balll.y + balll.rad >= sliderrr.y) && (balll.x >= sliderrr.x && balll.x <= sliderrr.x+sliderrr.width))
  {
    balll.yspeed += -1
    console.log("Ball x Slider")
    
    //reflect ball accord pos on slider
    if (balll.xspeed>0 && balll.x > sliderrr.x && balll.x < sq1){
      balll.xspeed *= -1
    }
    else if (balll.xspeed<0 && balll.x > sq3 && balll.x < send){
      balll.xspeed *= -1
    }
    
  }
}




