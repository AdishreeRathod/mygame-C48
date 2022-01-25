var bg,arrow,skeleton,superman,bgImg,arrowImg,skeletonImg,spImg,door,doorImg,shield,shieldImg,bg2,bg2Img;
var isShieldVisible=false;
var arrowG;
var gameState="play";
function preload(){
  bgImg=loadImage("images/background.png");
  skeletonImg=loadImage("images/skeleton.png");
  spImg=loadImage("images/superman.png");
  arrowImg=loadImage("images/arrow.png");
  doorImg=loadImage("images/door.png");
  shieldImg=loadImage("images/shield.png");
  bg2Img=loadImage("images/treasurehunt.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg.addImage(bgImg);
  bg.scale=3.9;
 
  superman= createSprite(50,height-250,100,100);
  superman.addImage(spImg);
  superman.scale=0.3;
  camera.position.y=0

  door=createSprite(width/2,-1000,50,50);
  door.addImage(doorImg);
  door.scale=0.45;

  skeleton=createSprite(width-150,height-190,100,100);
  skeleton.addImage(skeletonImg);
  skeleton.scale=0.3;

  shield=createSprite(150,height-250,100,100);
  shield.addImage(shieldImg);
  shield.scale=0.6;
  shield.visible=isShieldVisible;


  arrowG= new Group();
}

function draw() {
  background("brown");  
  //image(bgImg,0,-height*4,width,height*5); 
  if(gameState==="play"){
  bg.velocityY=3;
  if(bg.y>windowWidth/2){
    bg.y=bg.width/3
  };

  if(keyDown("s")){
    shield.visible=!isShieldVisible;
    isShieldVisible=!isShieldVisible;
 }
  drawSprites();

  if(keyDown("RIGHT_ARROW")){
    superman.position.x=superman.position.x+4;
    shield.position.x=shield.position.x+4;
  }

  if(keyDown("LEFT_ARROW")){
    superman.position.x=superman.position.x-4;
    shield.position.x=shield.position.x-4;
  }

  if(keyDown("UP_ARROW")){
    superman.position.y=superman.position.y-4;
    shield.position.y=shield.position.y-4;
    skeleton.position.y=skeleton.position.y-4;
    arrowG.setVelocityYEach(-2);
  }

  if(keyDown("DOWN_ARROW")){
    superman.position.y=superman.position.y+4;
    shield.position.y=shield.position.y+4;
    skeleton.position.y=skeleton.position.y+4;
  }



  camera.position.y=superman.position.y;

  for(var i =0;i<arrowG.length;i++){
    if(shield.isTouching(arrowG.get(i))&&isShieldVisible){
      arrowG.get(i).destroy();
      }
  };
   
  spawnArrows()

 if(arrowG.isTouching(superman)){
   gameState="end";
   superman.destroy();
 };

  if(superman.isTouching(door)){
    gameState="win";
    superman.destroy();
    bg.destroy();
    bg2=createSprite(windowWidth/2,windowHeight/2-1100,windowWidth,windowHeight);
    bg2.addImage(bg2Img);
    bg2.scale=1;
  
    };

}else if(gameState==="end"){
  arrowG.destroyEach();
  skeleton.destroy();
  door.destroy();
  shield.destroy();
  bg.velocityY=0;
  drawSprites();
  textSize(50);
  fill("lightblue");
  stroke("purple");
  strokeWeight(5);
  text("GAME OVER",width/2-150,superman.y);

}else if(gameState==="win"){
  arrowG.destroyEach();
  door.destroy();
  skeleton.destroy();
  shield.destroy();
  bg.velocityY=0;
  drawSprites();
  textSize(50);
  fill("lightblue");
  stroke("purple");
  strokeWeight(5);
  text("YOU WIN THE TREASURE!!",width/2-150,superman.y);

};
}
function spawnArrows(){
  if(frameCount%60===0){
    var arrow=createSprite(skeleton.position.x-50,skeleton.position.y-15);
    arrow.addImage(arrowImg);
    arrow.scale=0.3;
    arrow.velocityX=-10;

    arrow.lifetime=width/4;
    arrowG.add(arrow);
  }
}
