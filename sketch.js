var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var gameoverImg,Gameover
var score =0;
function preload(){
  
  backgroundImage = loadImage("background.png");
  
  arrowImage = loadImage("bullet.png");
  bowImage = loadImage("gun.png");
  red_balloonImage = loadImage("man.png");
  blue_balloonImage = loadImage("zombie1.png");
  green_balloonImage = loadImage("zombie2.png");
  pink_balloonImage = loadImage("zombie3.png");
  gameoverImg =loadImage("game Over.png")
}



function setup() {
  createCanvas(windowWidth,windowHeight,windowWidth, windowWidth);
  
  //creating background
  scene = createSprite(width/2,height/2);
  scene.addImage(backgroundImage);
  scene.scale = 5

  
  // creating bow to shoot arrow
  bow = createSprite(windowWidth,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  
}

function draw() {
 background(0);
 if(gameState === PLAY){

  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    switch(select_balloon ){
      case 1: redBalloon();
      break;
      case 2:blueBalloon();
      break;
      case 3:pinkBalloon();
      break;
      case 4:greenBalloon();
      break;
      default:break;
    }
  }

  /*Uncomment correct statement so that 
  game goes to "END" state 
  when red balloon is hit*/
  if (arrowGroup.isTouching(redB)) 
  //if (arrowGroup.Collide(redB)) 
  //if (arrowGroup.isCollide(redB)) 
  //if(frameCount>700)//comment this line after selecting the solution
  {
    redB.destroyEach();
    gameState=END; 
   }
 
  if (gameState === END) {
  bow.destroy();
  scene.velocityX = 0;
  pinkB.destroyEach();
  greenB.destroyEach();
  blueB.destroyEach();
  arrowGroup.destroyEach();
  Gameover = createSprite(windowWidth/2,windowHeight/2)
  Gameover.addImage(gameoverImg)
}


 if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}

/*Uncomment correct if block to 
destroy the blue balloon when hit 
by the arrows */

  if (arrowGroup.isTouching(blueB)) {
   blueB.destroyEach();
   arrowGroup.destroyEach();
   score=score+2;
 }


//  if (arrowGroup.isTouching(redB)) {
//   blueB.destroyEach();
//   arrowGroup.destroyEach();
// }


//  if (arrowGroup.isTouching(blueB)) {
//   arrowGroup.destroyEach();
// }


if (arrowGroup.isTouching(pinkB)) {
  pinkB.destroyEach();
  score=score+1;
}
 }
  
  drawSprites();
  text("Score: "+ score, 300,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(60, windowHeight-60)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 750;
  red.scale = 0.4;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(60, windowHeight-60)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 750;
  blue.scale = 0.4;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(60, windowHeight-60)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 750;
  green.scale = 1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, windowHeight-60)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 750;
  pink.scale = 1
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(windowWidth, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = windowWidth;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 750;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}