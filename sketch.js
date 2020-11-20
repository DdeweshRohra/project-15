
var sword, swordImg, fruitGroup, enemyGroup, appleFruit, pearFruit, enemy1, enemy2, randomDisplay, orangeFruit, bananaFruit;

var orangeImg, appleImg,pearImg, bananaImg, enemy1Img, enemy2Img;

var score = 0, gameOver, gameOverImg;

var gameoverSound, sliceSound;

//gamestate variables are assigned here
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  //All the images will be loaded here
  swordImg= loadAnimation("sword.png");
  
  orangeImg = loadAnimation("fruit1.png");
  
  appleImg = loadAnimation("fruit2.png");
  
  pearImg = loadAnimation("fruit3.png");
  
  bananaImg = loadAnimation("fruit4.png");
  
  enemy1Img = loadAnimation("alien1.png");
  
  enemy2Img = loadAnimation("alien2.png");
  
  gameOverImg = loadAnimation("gameover.png"); 
  
  gameoverSound = loadSound("gameover.mp3");
  
  sliceSound = loadSound("knifeSwoosh.mp3");
}

function setup(){
  
  createCanvas (300,300);
  
  //groups are created
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  //sword is created
  sword = createSprite(100,100,10,10);
  sword.scale = 0.5;
  sword.addAnimation("sword", swordImg);

  
}

function draw(){
  background("peru");
  
  if(gameState === PLAY){ // gamestate is put into use
    sword.y = mouseY;//sword is given mouse controls
    sword.x = mouseX;
    fruit(); //all the functions are called
    enemies();
    
    if (sword.isTouching(fruitGroup)){
      sliceSound.play();
      score ++; //score is incrementated when sword touches fruit
      fruitGroup.destroyEach();
    }
    
    if (sword.isTouching(enemyGroup)){
      gameoverSound.play();
      gameState = END; //the gamestate is END and the computer will move on to other if                            statement  
      
    }
    
  }
  
  if (gameState === END){
    fruitGroup.destroyEach(); //the sprites are destroyed
    enemyGroup.destroyEach();
    gameOver = createSprite(100,50,20,20); //gameover message is displayed
    gameOver.scale = 0.75;
    gameOver.addAnimation("over", gameOverImg);
      
  }
  
  drawSprites();
  
  fill("gold");
  stroke("black");
  textSize(20);
  text("Score: " + score, 100, 20);  //the score is displayed
  
  randomDisplay = Math.round(random(30,270));
 
  
  function orange(){ //orange is created and properties are given to it (all the other                          moving sprites will work similarly)
     var position = Math.round(random(1,2));
    orangeFruit = createSprite(randomDisplay,420,100,2);
    orangeFruit.scale = 0.2;
    orangeFruit.addAnimation("orange", orangeImg); //orange is given animation
  
    orangeFruit.lifetime = 220; //lifetime: avoids memory leak
    
    if (position === 1){
      orangeFruit.y = 400;
      orangeFruit.velocityY = -(7+score/4);
    }
    
    if (position === 2){
      orangeFruit.y = 0;
      orangeFruit.velocityY = (7+score/4);
    }
    
    fruitGroup.add(orangeFruit); //the orange is added to fruitGroup 
   
  }
  
  function apple(){ //apple is created and properties are given to it 
    var position = Math.round(random(1,2));
    appleFruit = createSprite(randomDisplay,320,10,10);
    appleFruit.scale = 0.2;
    appleFruit.addAnimation("apple", appleImg);
    appleFruit.lifetime = 220;

    
    if (position === 1){
      appleFruit.y = 300;
      appleFruit.velocityY = -(7+score/4);
    }
    
    if (position === 2){
      appleFruit.y = 0;
      appleFruit.velocityY = (7+score/4);
    }
    fruitGroup.add(appleFruit);
    
  }
  
  function pear(){ //pear is created and properties are given to it
    var position = Math.round(random(1,2));   
    pearFruit = createSprite(randomDisplay,320,10,10);
    pearFruit.scale = 0.2;
    pearFruit.addAnimation("pear", pearImg);
    pearFruit.lifetime = 220;
    
    if (position === 1){
      pearFruit.y = 300;
      pearFruit.velocityY = -(7+score/4);
    }
    
    if (position === 2){
      pearFruit.y = 0;
      pearFruit.velocityY = (7+score/4);
    }
    fruitGroup.add(pearFruit);
    
  }
  
  function banana(){ //banana is created and properties are given to it
    var position = Math.round(random(1,2));
    bananaFruit = createSprite(randomDisplay,320,10,10);
    bananaFruit.scale = 0.18;
    bananaFruit.addAnimation("banana", bananaImg);
    //bananaFruit.velocityY = -8;
    bananaFruit.lifetime = 220;
    
    if (position === 1){
      bananaFruit.y = 300;
      bananaFruit.velocityY = -(7+score/4);
    }
    
    if (position === 2){
      bananaFruit.y = 0;
      bananaFruit.velocityY = (7+score/4);
    }
    fruitGroup.add(bananaFruit);
    
  }
  
  function enemy_1(){ //enemy1 is created and properties are given to it (enemy2 works                           similarly)
    enemy1 = createSprite(randomDisplay,320,10,10);
    enemy1.addAnimation("enemy1", enemy1Img);
    enemy1.velocityY = -(8+score/4);
    enemy1.lifetime = 220;
    enemyGroup.add(enemy1); //added
    
  }
  
  function enemy_2(){ //enemy2 is created and properties are given to it

    enemy2 = createSprite(randomDisplay,320,10,10);
    enemy2.addAnimation("enemy2", enemy2Img);
    enemy2.velocityY =  -(8+score/4);
    enemy2.lifetime = 220;
    enemyGroup.add(enemy2);
    
  }
  
  function fruit(){ // this is to make sure fruits spawn at a random order
    if (frameCount % 40 ===0){
      var select_fruit = Math.round(random(1,4));
      switch(select_fruit){
        case 1: orange();
                break;
        case 2: apple()
                break;
        case 3: pear();
                break;
        case 4: banana();
                break;
        default: break;
        
      }
    
    }
     
  }
  
  function enemies(){ // this is to make sure enemies spawn at a random order
    if (frameCount%100 === 0){
      var select_enemy = Math.round(random(1,2));
      switch(select_enemy){
        case 1: enemy_1();
                break;
        case 2: enemy_2();
                break;
        default: break;
        
      }
                
    }
    
  }
    
}