function Turtles (x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
  this.speed = 2;
}

Turtles.prototype.draw = function() {
  this.context.drawImage(turtle1, this.x, this.y, this.width, this.height);
  return this;
};

Turtles.prototype.swimLeft = function() {
  if (this.x < -50){
    this.x = 680;
  }
  return (this.x -= this.speed);
};



module.exports = Turtles;
