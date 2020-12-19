//Create variables here
var dog;
var dogNormal, dogHappy;
var dogBowl;
var database;
var foodStock;
var foodS;

function preload()
{
  //load images here
  dogNormal = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
  dogBowl = loadImage("dogBowl.png");

}

function setup() {
  createCanvas(800, 700);
  
  dog = createSprite(400, 350, 10, 10);
  dog.addImage(dogNormal);
  dog.scale = 0.15;

  bowlSprite = createSprite(350, 390, 10, 10);
  bowlSprite.addImage(dogBowl);
  bowlSprite.visible = false;

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock, showError);
  
}


function draw() {  
  background("yellow");

  textSize(30);
  stroke(10);
  text("Press up arrow to feed Ben", 250, 100);
  text("You have " + foodS + " food left", 250, 500);

  if(foodS == 0) {
    text("Oh no! You ran out of food!", 250, 550);
  }

  if(foodS != 0) {
    if(keyWentDown(UP_ARROW)) {

      writeStock(foodS);
      dog.addImage(dogHappy);
      bowlSprite.visible = true;

    }

    if(keyWentUp(UP_ARROW)) {

      writeStock(foodS);
      dog.addImage(dogNormal);
      bowlSprite.visible = false;

    }
  }

  drawSprites();
  //add styles here

}

function readStock(data) {
  foodS = data.val();
}

function showError() {
  console.log("ERROR");
}

function writeStock(x) {

  if(x <= 0){
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref("/").set({
    'Food' : x
  })

}



