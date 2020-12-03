
/*const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;*/

var ground;
var boy1, boy2;
var boy1Image, boy2Image;
var score = 0;
var bgImage, bg;
var mapButton, mapButtonImage;
var f=0;
var map, mapImage;
var desertImage;
var cactus, cactusImage;
var insect, insectImage;
var gameState = "play";
var diamondImage, diamond;
var diamonds = 0;
var gameOver, gameOverImage;
var restart, restartButton;
var flag = 0;
var fireImage;
var puddle,puddleImage;
var rainImage;
var zombieBg;
var zombie, zombieImage;
var block,block1, blockImage;
var waterfall;
var treasure, treasureImage;
var arrow, arrowImage;
var  youWin, youWinImg;

function preload()
{
	//boy1Image = loadAnimation("images/boyRunning1.png","images/boyRunning2.png");
	boy1Image = loadAnimation("images/boyRunning3.png","images/boyRunning4.png");
	bgImage = loadImage("images/bg1.png");
	mapButtonImage = loadImage("images/mapButton.png");
	mapImage = loadImage("images/mapImage.png");
	desertImage = loadImage("images/desert.jpg");
	cactusImage = loadImage("images/obstacle2.png");
	insectImage = loadImage("images/insect.png");
	diamondImage = loadImage("images/diamond.png");
	gameOverImage = loadImage("images/gameOverImage.png");
	restartButton = loadImage("images/restartButton.png");
	fireImage = loadImage("images/fire.jpg");
	rainImage = loadImage("images/rain.jpg");
	puddleImage = loadImage("images/puddle.png");
	zombieBg = loadImage("images/zombieBg.jpg");
	zombieImage = loadImage("images/zombie.png");
	blockImage = loadImage("images/blocks.png");
	waterfall = loadImage("images/waterfall.jpg");
	treasureImage = loadImage("images/treasure.png");
	zombieImage = loadImage("images/zombie.png");
	arrowImage = loadImage("images/arrow.png");
	youWinImg = loadImage("images/youWin.png")
}

function setup() {
	createCanvas(1200, 500);


	//engine = Engine.create();
	//world = engine.world;

	//Create the Bodies Here.

	ground = createSprite(600,height, 1200, 50);
	ground.scale = 1.5;
	ground.velocityX = -(6 + 3*score/100);	
	//ground.visible = false;

	bg= createSprite(600,150,1200,500);
	bg.addImage(bgImage);
	bg.scale = 2.5;
	bg.velocityX = -(6 + 3*score/100);	


	boy1 = createSprite(100,500,50,50);
	boy1.addAnimation("running",boy1Image);
	boy1.scale= 0.7;

	restart = createSprite(600,350,20,20);
	restart.addImage(restartButton);	
	restart.scale = 0.1;
	restart.visible = false;

	gameOver = createSprite(600,250,20,20);
	gameOver.addImage(gameOverImage);
	gameOver.scale = 0.4;
	gameOver.visible= false;

	treasure = createSprite(1000,400,20,20);
	treasure.addImage(treasureImage);
	treasure.scale = 0.5;
	treasure.visible = false;

	youWin = createSprite(600,250,20,20);
	youWin.addImage(youWinImg);
	youWin.scale = 2.5;
	youWin.visible = false;

	//Engine.run(engine);

	/*map = createSprite(600,250,100,100);
		map.addImage(mapImage);
		map.scale = 2;*/
	
		obstaclesGroup = new Group();
		insectsGroup = new Group();
		diamondGroup = new Group();
		puddleGroup = new Group();
		blockGroup = new Group();
		block1Group = new Group();
		zombieGroup = new Group();
		arrowGroup = new Group();
}


function draw() {
  //rectMode(CENTER);
  background(0);

 
	boy1.collide(ground);

	if(gameState=== "play"){
	if (ground.x < 200){
		ground.x = ground.width/2;
	  }
	  if (bg.x < 200){
		bg.x = bg.width/2;
	  }
	 

	if(keyDown("space") &&  boy1.y>=280){
		
		boy1.velocityY = -4;
		
	}

	/*if(keyDown("right_arrow")){
		boy1.x = boy1.x + 10;
	}*/
	
	boy1.velocityY += 0.8;

	//console.log(boy1.y);

	if(frameCount % 100 === 0){
		score+= 2;
	}
	if(score >=0 && score<2){
		bg.addImage(bgImage);
		bg.scale = 2.5
	}
	else if(score >= 2 && score <22){
		bg.addImage(desertImage);
		bg.scale = 7;
		spawnCactus();
	}

	else if(score >= 22 && score <=42){
		obstaclesGroup.destroyEach();
		insectsGroup.destroyEach();
		bg.addImage(fireImage);
		//bg.y = 350;
		bg.scale = 3;
		spawnBlocks();
	}
	
	else if(score >= 42 && score <62){
		blockGroup.destroyEach();
		bg.addImage(rainImage);
		//bg.y = 350;
		bg.scale = 3;
		//spawnCactus();
		spawnPuddles();
	}
	else if(score >= 62 && score <82){
		puddleGroup.destroyEach();
		bg.addImage(zombieBg);
		//bg.y = 350;
		bg.scale = 3;
		spawnZombies();
		if (keyDown("s")) {
			spawnArrow();
		  }
	
	}
	
	else{
		zombieGroup.destroyEach();
		bg.addImage(waterfall);
		bg.scale = 7;
		//bg.y = 150;
	}

	if(score === 88){
		treasure.visible = true;
		treasure.velocityX = -(6 + 3*score/100)
	}

	if(boy1.isTouching(treasure)){
		youWin.visible = true;
		bg.velocityX = 0;
		ground.velocityX = 0;
		treasure.velocityX = 0;
		diamondGroup.setVelocityXEach(0);
	}

	spawnDiamonds();
	if(boy1.isTouching(diamondGroup)){
		diamonds+=1;
		diamondGroup.destroyEach();
	}
}

	/*if(  mousePressedOver(mapButton)){

		//if(mousePressedOver(mapButton)){
		//text("Done", 500,400);
		//bg.addImage(bgImage);
		
		//f=0;
		map.destroy();
		
		//}
	}*/	
 
	
	  if (arrowGroup.isTouching(zombieGroup)) {
		zombieGroup.destroyEach();
		arrowGroup.destroyEach();
		//score += 1;
	  }
	
	if(boy1.isTouching(obstaclesGroup) && gameState === "play"|| boy1.isTouching(insectsGroup )&& gameState === "play"){
		gameState = "end"
	}

	if(boy1.isTouching(puddleGroup) && gameState === "play"){
		gameState = "end";
	}
	
	if(boy1.isTouching(blockGroup) && gameState === "play"){
		gameState = "end";
	}
	if(boy1.isTouching(block1Group) && gameState === "play"){
		gameState = "end";
	}

	if(boy1.isTouching(zombieGroup) && gameState === "play"){
		gameState = "end";
	}

	if(gameState === "end"){
		bg.velocityX = 0;
		ground.velocityX=0;
		gameOver.visible = true;
		restart.visible = true;

		obstaclesGroup.setVelocityXEach(0);
		insectsGroup.setVelocityXEach(0);
		diamondGroup.setVelocityXEach(0);
		puddleGroup.setVelocityXEach(0);
		blockGroup.setVelocityXEach(0);
		block1Group.setVelocityXEach(0);
		zombieGroup.setVelocityXEach(0);
		arrowGroup.setVelocityXEach(0);

		obstaclesGroup.setLifetimeEach(-1);
		insectsGroup.setLifetimeEach(-1);
		diamondGroup.setLifetimeEach(-1);
		puddleGroup.setLifetimeEach(-1);
		blockGroup.setLifetimeEach(-1);
		block1Group.setLifetimeEach(-1);
		zombieGroup.setLifetimeEach(-1);
		arrowGroup.setLifetimeEach(-1);

		if(mousePressedOver(restart)) {
			redo();
		  }
	}
	/**/
 
	
  drawSprites();
  //mapCreate();
  //createDesert();

	strokeWeight(3)
	stroke("yellow");
	textSize(45);
	text("MILES CROSSED: " + score, 100,60);
	text("DIAMONDS: " +diamonds, 800,60);
	
}

function spawnCactus(){
	if(frameCount % 100 === 0){
		cactus = createSprite(1000,450,20,20);
		cactus.addImage(cactusImage);
		cactus.velocityX = -(6 + 3*score/100)
		cactus.scale=0.7;
		//cactus.velocityX = -(6 + 3*score/100);
		cactus.lifetime = 300;
		obstaclesGroup.add(cactus);
	}
	if(frameCount % 250 === 0){
		insect = createSprite(800,450,20,20);
		insect.addImage(insectImage);
		insect.velocityX = -(6 + 3*score/100)
		insect.scale=0.2;
		insect.velocityX = -(6 + 3*score/100);
		insect.lifetime = 300;
		insectsGroup.add(insect);
	}
}

function spawnDiamonds(){
	if(frameCount % 500 === 0){
		diamond = createSprite(1500,450,20,20);
		diamond.addImage(diamondImage);
		diamond.velocityX = -(6 + 3*score/100)
		diamond.scale=0.1;
		diamond.velocityX = -(6 + 3*score/100);
		diamond.lifetime = 300;
		diamondGroup.add(diamond);
	}
	
}

function spawnPuddles(){
	if(frameCount % 70 === 0){
		puddle = createSprite(1000,450,20,20);
		puddle.addImage(puddleImage);
		puddle.velocityX = -(6 + 3*score/100)
		puddle.scale=0.3;
		//puddle.velocityX = -(6 + 3*score/100);
		puddle.lifetime = 300;
		puddleGroup.add(puddle);
	}
	
}

function spawnBlocks(){
	if(frameCount % 80 === 0){
		stroke(255);
		block = createSprite(1000,140,70,120);
		block1=createSprite(1000,430,70,120);
		
		block.shapeColor = "red";
		block1.shapeColor = "red";
		//block.addImage(blockImage);
		block.velocityX = -(6 + 3*score/100)
		block1.velocityX = -(6 + 3*score/100)
		//block.scale=1.3;
		//block.setCollider("rectangle", 0, 0, 20, 10);
		//block.debug == true;
		//puddle.velocityX = -(6 + 3*score/100);
		block.lifetime = 300;
		block1.lifetime = 300;
		blockGroup.add(block);
		block1Group.add(block1);
	}
  }

  function spawnZombies(){
	if(frameCount % 80 === 0){
		zombie = createSprite(1200,400,20,20);
		zombie.addImage(zombieImage);
		zombie.velocityX = -(6 + 3*score/100)
		zombie.scale=0.65;
		//block.setCollider("rectangle", 0, 0, 20, 100);
		//block.debug == true;
		//puddle.velocityX = -(6 + 3*score/100);
		zombie.lifetime = 300;
		zombieGroup.add(zombie);
	}
  }

  function spawnArrow() {
	arrow = createSprite(180, 400, 60, 10);
	arrow.addImage(arrowImage);
	arrow.x = 250;
	//arrow.y = bow.y;
	arrow.velocityX = 4;
	arrow.lifetime = 190;
	arrow.scale = 0.3;
	arrowGroup.add(arrow);
	return arrow;
  
  }

function redo(){
	gameState = "play";
	bg.addImage(bgImage);
	gameOver.visible = false;
	restart.visible = false;

	bg.velocityX = -(6 + 3*score/100);	
	ground.velocityX = -(6 + 3*score/100);	
	
	obstaclesGroup.destroyEach();
	insectsGroup.destroyEach();
	diamondGroup.destroyEach();
	puddleGroup.destroyEach();
	blockGroup.destroyEach();
	block1Group.destroyEach();
	zombieGroup.destroyEach();
	arrowGroup.destroyEach();
	
	diamonds = 0;
	
	score = 0;
  }

  