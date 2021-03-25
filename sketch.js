var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var names = window.prompt('Please enter your name??','Paakshik');
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
hit = loadSound('zapsplat_impacts_metal_thin_foil_baking_tray_hit_knock_bash_002_64008.mp3')
movers= loadSound('COMCell_Iphone touch sound 2 (ID 2038)_BSB.wav')  
}

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
 
}

// function to display UI
function draw() {
  background(bg);

  data1();
  data2()
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   move(-9,0);
   data1()
   movers.play();
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    move(9,0);
    data1()
    movers.play();
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    move(0,-9);
    data2();
    movers.play();
    if (balloon.scale >= 0.1){
     
    balloon.scale=  balloon.scale-0.01;
    }
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    move(0,9);
    data2();
    movers.play();
    if (balloon.scale <= 0.5){
      console.log('pAAKSHIK')
    balloon.scale=  balloon.scale+0.01;
    }
  }
if (balloon.y > 550){
  balloon.y = 550;
  hit.play();
}
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);

}
function move(x,y){
balloon.x =balloon.x + x;
balloon.y =balloon.y + y;






}
function data1(){
  let database  = firebase.database();
  let ref = database.ref('position/x');

  ref.set({
    'name':names,
  'X':balloon.x
    
  })
  ref.on('value',updater,errorer)
}
function data2(){
  let database  = firebase.database();
  let ref2 = database.ref('position/y');
  ref2.set({
    'name':names,
'Y':balloon.y,
})
 
  ref2.on('value',updater2,errorer2)

}

function updater(data){
posX = data.val();

fill(0);
stroke("white");
textSize(25); 
text(`X position: ${posX.X}`,40,60);
text(`Name: ${names}`,40,100);
}

// keies.forEach(key => {
// let named = posX[key].name;
// let X = posX[key].X;
// console.log(`${named},${X}`)
// })


function errorer(error){
console.log(error);
  
  }
  function updater2(data){
    posY = data.val();
  
    fill(0);
stroke("white");
textSize(25);
text(`Y position: ${posY.Y}`,440,60);
text(`Name: ${names}`,440,100);
    // keies.forEach(key => {
    // let named = posX[key].name;
    // let X = posX[key].X;
    // console.log(`${named},${X}`)
    // })
    
    }
    function errorer2(error){
    console.log(error);
      
      }