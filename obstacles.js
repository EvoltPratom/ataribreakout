
function obstacle(x,y){
  this.x = x
  this.y = y
  this.h = 20
  this.w = 20
  // this.color = color(random(256),random(256),random(256))
  this.render = function(){
    fill(color('magenta'))
    rect(this.x,this.y,this.w,this.h)
  }
  
}

function ballCollide(aBall, aObs){
  //returns true or false
  
  //for left and right collision
  if ( ((aBall.x+aBall.rad >= aObs[0]&& aBall.xspeed > 0) || (aBall.x-aBall.rad <= aObs[0]+30 && aBall.xspeed < 0)) &&
       (aBall.y>aObs[1] && aBall.y < aObs[1]+20)
      )
    {
      aBall.xspeed*= -1
      console.log("Bx")
      return true
    }

  //for top and bottom collision 
  if ( ((aBall.y+aBall.rad >= aObs[1]&& aBall.yspeed > 0) || (aBall.y - aBall.rad <= aObs[1]+20 && aBall.yspeed < 0)) &&
       (aBall.x > aObs[0] && aBall.x < aObs[0]+30)
      )
    {
      aBall.yspeed*= -1
      console.log("By")
      return true
    }
  return false

}

function ballCollide2(bll,aobs){
  // console.log(33)
  //clamp functions 
  var nx = max(aobs[0],min(aobs[0]+20,bll.x))
  var ny = max(aobs[1],min(aobs[1]+20,bll.y))
  point(nx, ny);
  stroke('purple'); // Change the color
  strokeWeight(2);
  //modulo nx and ny
  
  // if (nx <= bll.rad){
  //   bll.xspeed *= -1
  //   return true
  // }
  // if (ny <=bll.rad){
  //   bll.yspeed *= -1
  //   return true
  // }
  // return false
  
  var N = sqrt(nx*nx + ny*ny)
  console.log(N,bll.rad)

  if (N <= bll.rad){ //collision
    return true
  }
  return false

}

function generateObstacles(){
  
  var obs = []
  for (let x = 0; x < 400; x+=20){
    for (let y =0;y < 300; y+=20){
      obs.push([x,y])
    }
  }
  console.log("Obstacles Generated!")
  obsPositions = obs
}

function renderObstacles(){
  // console.log(bll)
  obsPositions = getObsPos()
  
  obsPositions.forEach(function(obsP){
//     //check if this obsPos collides with the ball
       if (ballCollide3(bll,obsP)){
         console.log("Ball x obs", obsP)

         incScore();
         console.log(score)

         obsPositions.splice(obsPositions.indexOf(obsP),1)
       }
  })
  
  obsPositions.forEach(function(obsP){
    var aObs = new obstacle(obsP[0],obsP[1])
    aObs.render()
  })
  
   
  
}


function ballCollide3(bll,aobs){
  var bx = bll.x, by = bll.y, bxv = bll.xspeed, byv = bll.yspeed
  var r  = bll.rad, obsx = aobs[0], obsy = aobs[1]
  var w  = 20, h = 20
  
  //collision from right
  if (bxv <0 && bx>obsx+w && bx-r < obsx+w &&  by > obsy && by < obsy+h){
      console.log("From Right")
      bll.xspeed *= -1
    return true
    }
  //collision from left
  else if (bxv>0 && bx<obsx && bx+r > obsx && by>obsy && by<obsy+h){
      console.log("From left")
      bll.xspeed *= -1
      return true

  }
  //collision from top
  else if (byv>0 && by<obsy && by+r>obsy && bx>obsx && bx<obsx+w){
      console.log("From top")
      bll.yspeed *= -1
      return true

  }
  //collision from bottom
  else if (byv<0 && by>obsy+h && by-r<obsy+h && bx>obsx && bx<obsx+w){
    console.log("From bottom")
    bll.yspeed *= -1
    return true
  }
  
  return false
}
