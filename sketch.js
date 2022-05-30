//gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//trex
var trex, trex_running, trex_collided;

//ground
var ground, invisibleGround, groundImage;

//clouds
var cloudsGroup, cloudImage;

//obstacles
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//score
var score;






function preload(){
  //trex animation
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  //ground image
  groundImage = loadImage("ground2.png");
  
  //cloud image
  cloudImage = loadImage("cloud.png");
  
  //obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  //game over text
  game_over = loadImage("gameOver.png")
  
  //restart button
  restart = loadImage ("restart.png") 
}

function setup() {
  createCanvas(600, 200);
  
  //trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  //ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  //invisisble ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  //score
  score = 0;
 
//gameover
  gameover = createSprite(300,100)
 gameover.addImage("gameover",game_over)
 gameover.scale = 0.5

 //restart button
 restartbutton = createSprite(300,140)
 restartbutton.addImage("restart",restart)
 restartbutton.scale = 0.5
}

function draw() {
  background(180);
  
  //score text
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    
    //ground velocity
    ground.velocityX = -4;
   
    //score count
    score = score + Math.round(frameCount/60);
    
    //infinte ground
    if (ground.x < 0){
      ground.x = ground.width/2;
  }
    
  //trex velocity
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
   
  //trex gravity
  trex.velocityY = trex.velocityY + 0.8
  
  //invisible gameover and restart 
  gameover.visible = false
  restartbutton.visible = false

  //cloud function
  spawnClouds();
  
  // obstacles function
 spawnObstacles();
  
 //play state to end state
  if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;

      gameover.visible = true
      restartbutton.visible = true
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
// make trex collide with invisible ground
  trex.collide(invisibleGround);
  
  drawSprites();
}

//create obstacles function
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   //obstacle scale and lifetime
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

// create clouds function
function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

