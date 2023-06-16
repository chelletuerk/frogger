var Cars = require('./cars');

function CarGenerator(context) {
  this.laneOne = [];
  this.laneTwo = [];
  this.laneThree = [];
  this.laneFour = [];
  this.laneFive = [];
  this.generateCars(this.laneOne, 0, 520, {minus: true, val: 180}, context);
  this.generateCars(this.laneTwo, 600, 480, {plus: true, val: 180}, context);
  this.generateCars(this.laneThree, 80, 440, {minus: true, val: 120}, context);
  this.generateCars(this.laneFour, 540, 400, {minus: true, val: 140}, context);
  this.generateCars(this.laneFive, 20, 360, {minus: true, val: 140}, context);
  this.allLeft = [this.laneTwo, this.laneFour];
  this.allRight = [this.laneOne, this.laneThree, this.laneFive];
}

CarGenerator.prototype.generateCars = function(lane, x, y, instructions, ctx) {
  [0, 1, 2].forEach(function(e) {
    lane.push(new Cars(x, y, 60, 35, ctx));
    if (instructions.minus) x -= instructions.val;
    if (instructions.plus) x += instructions.val;
  });
};

module.exports = CarGenerator;
