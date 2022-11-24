var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_jumping, monkey_collided;
var ground, ground1, ground_1, ground_2, ground_3, ground_4, ground_5, ground_6, ground_7, ground_8, ground_9;
var invisibleGround;
var tree;
var banana_peel, banana, apple;
var sun, sun1

var gameover, gameover1;
var restart, restart1;
var score, food, foods;

var cloud1, cloudsGroup, bananaGroup, appleGroup;
var obstaclesGroup;

function preload(){

  monkey_running = loadAnimation("Monkey1.png","Monkey2.png");
  monkey_collided = loadAnimation("Monkey5.png");
  monkey_jumping = loadAnimation("Monkey3.png");

  apple=loadImage('Apple.png')
  banana=loadImage('BananaBunch.png')

  
  ground1=loadImage('grass.png');
  cloud1=loadImage('cloud.png')

  sun1=loadImage('sun.png')

  tree=loadImage('tree.png');
  banana_peel=loadImage('banana.png');

  gameover1=loadImage('Game Over.png')
  restart1=loadImage('restart.png')
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  

  ground=createSprite(165,605);
  ground.addImage(ground1);
  ground.velocityX=-4

  ground_1=createSprite(315,605);
  ground_1.addImage(ground1);
  ground_1.velocityX=-4

  ground_2=createSprite(460,605);
  ground_2.addImage(ground1);
  ground_2.velocityX=-4
  

  ground_3=createSprite(605,605);
  ground_3.addImage(ground1);
  ground_3.velocityX=-4

  ground_4=createSprite(750,605);
  ground_4.addImage(ground1);
  ground_4.velocityX=-4

  ground_5=createSprite(895,605);
  ground_5.addImage(ground1);
  ground_5.velocityX=-4

  ground_6=createSprite(1040,605);
  ground_6.addImage(ground1);
  ground_6.velocityX=-4

  ground_7=createSprite(1185,605);
  ground_7.addImage(ground1);
  ground_7.velocityX=-4

  ground_8=createSprite(1330,605);
  ground_8.addImage(ground1);
  ground_8.velocityX=-4

  ground_9=createSprite(1475,605);
  ground_9.addImage(ground1);
  ground_9.velocityX=-4

  invisibleGround = createSprite(400,720,width,10);
  invisibleGround.visible = false;

  monkey = createSprite(150,650,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided" , monkey_collided)
  monkey.addAnimation("jumping",monkey_jumping)
  monkey.scale = 0.8;

  sun=createSprite(125,100);
  sun.addImage(sun1);
  sun.scale=0.6;

  cloudsGroup=new Group();
  obstaclesGroup= new Group();
  bananaGroup= new Group();
  appleGroup= new Group();


  gameover=createSprite(width/2,height/2);
  gameover.addImage(gameover1)


  restart=createSprite(width/2,height/3);
  restart.addImage(restart1);
  restart.scale=0.7;

  monkey.setCollider("circle",0,0,45)
  monkey.debug=true

  score=0;
  food=2000;

}

function draw(){
  background('cyan');

  textSize(20);
  fill("red");
  text("Score: "+ score, 250,60);

  textSize(20);
  fill("blue");
  text("Food: "+ food, 450,60);
  
  
  if (gameState === PLAY){
  
    score = score + Math.round(frameCount/150);

    food = food - Math.round(frameCount/150);

  
  if(ground.x < 0 ){
    console.log(ground);
    ground.x = width ;    
    console.log("this is ground")
  }
  if(ground_1.x < 0 ){
    ground_1.x = width;
    console.log("this is ground_1")
  }
  if(ground_2.x < 0 ){
    ground_2.x = width;
    console.log("this is ground_2")
  } 
  if(ground_3.x < 0 ){
    ground_3.x = width;
    console.log("this is ground3")
  } 
  if(ground_4.x < 0 ){
    ground_4.x = width;
    console.log("this is ground_4")
  } 
  if(ground_5.x < 0 ){
    ground_5.x = width;
    console.log("this is ground_5")
  } 
  if(ground_6.x < 0 ){
    ground_6.x = width;
    console.log("this is ground_6")
  } 
  if(ground_7.x < 0 ){
    ground_7.x = width;
    console.log("this is ground_7")
  } 
  if(ground_8.x < 0 ){
    ground_8.x = width;
    console.log("this is ground_8")
  } 
  if(ground_9.x < 0 ){
    ground_9.x = width;
    console.log("this is ground_9")
  } 
  gameover.visible=false
  restart.visible=false

  if(keyDown("space")&& monkey.y >=100) {
    monkey.velocityY = -13;
    monkey.changeAnimation("jumping",monkey_jumping)
    console.log("this is jumping")
  }

  createBanana();
  createApple();

  if(appleGroup.isTouching(monkey)){
    food=food+100;
    appleGroup.destroyEach()
  }
  
  if(bananaGroup.isTouching(monkey)){
    food=food+100;
    bananaGroup.destroyEach()
  }
  

  monkey.velocityY = monkey.velocityY + 1.3



  if(monkey.velocityY>=-1){
    monkey.changeAnimation("running",monkey_running)
    console.log("changeAnimation   "+monkey.velocityY)
  }


 
 

  spawnObstacles()
  spawnClouds()
 // spawnFoods()

 if(obstaclesGroup.isTouching(monkey)){
  gameState = END;
}
if(food<=0){
  gameState = END;
}
}




else if (gameState === END) {
  monkey.velocityY=0;
 //Change the animation
 monkey.changeAnimation("collided",monkey_collided)
 obstaclesGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);
ground.velocityX=0
ground_1.velocityX=0
ground_2.velocityX=0
ground_3.velocityX=0
ground_4.velocityX=0
ground_5.velocityX=0
ground_6.velocityX=0
ground_7.velocityX=0
ground_8.velocityX=0
ground_9.velocityX=0


 gameover.visible=true
 restart.visible=true
 cloudsGroup.destroyEach()
 //Set lifetime of the game objects so that they are never destroyed
 obstaclesGroup.setLifetimeEach(-1)
 cloudsGroup.setLifetimeEach(-1)

 bananaGroup.destroyEach();
 appleGroup.destroyEach();

 bananaGroup.setVelocityXEach(0);
 appleGroup.setVelocityXEach(0);
}



monkey.collide(invisibleGround);

 
  drawSprites();
}


function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(500,700,10,40);
    obstacle.velocityX = -6;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(banana_peel);
               obstacle.scale = 0.2;
               break;
       case 2: obstacle.addImage(tree);
               obstacle.scale = 0.35;
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
}

function spawnClouds(){
  
    if (frameCount % 150 === 0) {
     cloud = createSprite(700,100,40,10);
     cloud.y = Math.round(random(40,550));
     cloud.addImage(cloud1);
     cloud.scale = 0.5;
     cloud.lifetime = 145;
     cloud.velocityX = -3;

     cloudsGroup.add(cloud);
    }
}

function createBanana(){
  if (frameCount % 150 == 0) {
    var banana1 = createSprite (300,700,50,50);
    banana1.addImage(banana);
    banana1.scale=0.2;
    banana1.velocityX = -6;
    banana1.lifetime = 350;
    bananaGroup.add(banana1);
}
}
function createApple(){
  if (frameCount % 90 == 0) {
    var apple1 = createSprite(200,700,50,50);
    apple1.addImage (apple);
    apple1.scale=0.08
    apple1.velocityX = -6;
    apple1.lifetime = 350;
    appleGroup.add(apple1);
}
}