function Cars(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
  this.speed = 2;
}

Cars.prototype.draw = function() {
  this.context.drawImage(car1, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneTwo = function() {
  this.context.drawImage(truck1, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneThree = function() {
  this.context.drawImage(car2, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneFour = function() {
  this.context.drawImage(truck2, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneFive = function() {
  this.context.drawImage(car3, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.driveRight = function() {
  if (this.x > 600) {
    this.x = -60;
  }
  return (this.x += this.speed);
};

Cars.prototype.driveLeft = function() {
  if (this.x < 0) {
  this.x = 660;
  }
  return (this.x -= this.speed);
};

module.exports = Cars;
