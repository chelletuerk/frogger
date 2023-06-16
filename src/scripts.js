// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/frugger.png'
import './images/car1.png'
import './images/car2.png'
import './images/car3.png'
import './images/dead-frog.png'
import './images/Lily_Pad.png'
import './images/log.png'
import './images/start-screen.png'
import './images/truck1.png'
import './images/truck2.png'
import './images/turtle.png'
import './images/window-background.png'
import './images/winscreen.png'

var CarGenerator = require('./car-generator');
var LogGenerator = require('./log-generator');
var TurtleGenerator = require('./turtle-generator');
var LilyPadsGenerator = require('./lilypad-generator.js');
var Frog = require('./frog.js');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var frog = new Frog(280, 560, 40, 40, context);
var car1 = document.getElementById('car1');
var car2 = document.getElementById('car2');
var car3 = document.getElementById('car3');
var truck1 = document.getElementById('truck1');
var truck2 = document.getElementById('truck2');
var log1 = document.getElementById('log1');
var turtle1 = document.getElementById('turtle1');
var lilypad = document.getElementById('lilypad');
var isDrowning = true;
var turtleArrayOne = [];
var turtleArrayTwo = [];
var cars = new CarGenerator(context);
var logs = new LogGenerator(context);
var turtles = new TurtleGenerator(context);
var lilypads = new LilyPadsGenerator(context);
var level = 1;
var startScreen = document.getElementById('start-screen');
var startButton = document.getElementById('start-button');
var winScreen = document.getElementById('win-screen');
var gameOverScreen = document.getElementById('game-over-screen');
var restartButton = document.getElementById('restart-button');
var reloadButton = document.getElementById('reload-button');
var nextLevel = document.getElementById('next-level-button');


function collideCar(car) {
  if (frog.x < car.x + (car.width/1.5) &&
    frog.x + frog.width > car.x &&
    frog.y < car.y + car.height &&
    frog.height + frog.y > car.y){
      level = 1;
      levelUpRight(cars);
      resetFrog();
      gameOver();
    }
}

function logTravel(log) {
  if (frog.x < log.x + log.width &&
    frog.x + frog.width > log.x &&
    frog.y < log.y + log.height &&
    frog.height + frog.y > log.y){
      if(frog.x < 560){
          frog.x++;
          isDrowning = false;
        }
    }
}

function turtleTravel(turtle, speed) {
  if (frog.x < turtle.x + turtle.width &&
    frog.x + frog.width > turtle.x &&
    frog.y < turtle.y + turtle.height &&
    frog.height + frog.y > turtle.y) {
      if(frog.x > 0){
        frog.x -= 2;
        isDrowning = false;
      }
    }
}

function drowningFrog() {
  if (frog.y < 280 && frog.y >= 0 && isDrowning) {
    level = 1;
    levelUpRight(cars);
    resetFrog();
    gameOver();
  } else {
    isDrowning = true;
  }
}

function resetFrog() {
  frog.x = 280;
  frog.y = 560;
}

function win(lilypads) {
  lilypads.forEach(function (lilypad){
    if (frog.x < lilypad.x + lilypad.width &&
      frog.x + frog.width > lilypad.x &&
      frog.y < lilypad.y + lilypad.height &&
      frog.height + frog.y > lilypad.y){
      isDrowning = false;
      resetFrog();
      level += 3;
      levelUpRight(cars);
      addWinScreen();
    }
  });
}

function displayCanvas(){
  canvas.style.display='block';
  canvas.style.visibility='visible';
}

function addWinScreen() {
  winScreen.style.visibility='visible';
  canvas.style.visibility='hidden';
  startScreen.style.visiblility='hidden';
}

function gameOver() {
  gameOverScreen.style.visibility='visible';
  canvas.style.visibility='hidden';
  startScreen.style.visibility='hidden';
  winScreen.style.visibility='hidden';
}

function levelUpRight(cars) {
  cars.allRight.forEach(function(vehicles) {
    vehicles.forEach(function(vehicle) {
      vehicle.speed = level;
    });
  });
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  cars.laneOne.forEach(function (car) {
    car.draw().driveRight();
    collideCar(car);
  });
  cars.laneTwo.forEach(function (car) {
    car.drawLaneTwo().driveLeft();
    collideCar(car);
  });
  cars.laneThree.forEach(function (car) {
    car.drawLaneThree().driveRight();
    collideCar(car);
  });
  cars.laneFour.forEach(function (car) {
    car.drawLaneFour().driveLeft();
    collideCar(car);
  });
  cars.laneFive.forEach(function (car) {
    car.drawLaneFive().driveRight();
    collideCar(car);
  });
  logs.all.forEach(function(log) {
    log.forEach(function(e) {
      e.draw().floatRight();
      logTravel(e);
    });
  });
  turtles.all.forEach(function(turtle){
    turtle.forEach(function(e) {
      e.draw().swimLeft();
      turtleTravel(e);
    });
  });
  lilypads.forEach(function(lilypad){
    lilypads.forEach(function(e) {
      e.draw();
    });
  });
  win(lilypads);
  drowningFrog();
  frog.draw();
  requestAnimationFrame(gameLoop);
});



startButton.addEventListener('click', function() {
  startScreen.style.display='none';
  canvas.style.display='block';
  canvas.style.visibility='visible';
});

restartButton.addEventListener('click', function() {
  gameOverScreen.style.display='none';
  canvas.style.display='block';
  canvas.style.visibility='hidden';
  window.location.reload();
});

reloadButton.addEventListener('click', function(){
  gameOverScreen.style.display='none';
  canvas.style.display='block';
  canvas.style.visibility='hidden';
  window.location.reload();
});

nextLevel.addEventListener('click', function(){
  winScreen.style.visibility='hidden';
  canvas.style.visibility='visible';
});


window.addEventListener('keydown', function(event) {
  if (event.keyCode === 38){
    event.preventDefault();
    frog.moveUp();
  } else if (event.keyCode === 40){
    event.preventDefault();
    frog.moveDown();
  } else if (event.keyCode === 37){
    event.preventDefault();
    frog.moveLeft();
  } else if (event.keyCode === 39){
    event.preventDefault();
    frog.moveRight();
  }
});



console.log('This is the JavaScript entry file - your code begins here.');
