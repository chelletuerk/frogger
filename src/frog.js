function Frog(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

var frogger = document.getElementById('frog');


Frog.prototype.draw = function() {
  this.context.fillStyle = 'green';
  this.context.drawImage(frogger, this.x, this.y, this.width, this.height);
};

Frog.prototype.moveRight = function() {
    if (this.canMoveRight()) {
      this.x += 40;
    }
};

Frog.prototype.moveUp = function() {
  if (this.canMoveUp()) {
    this.y -= 40;
  }
};

Frog.prototype.moveDown = function() {
  if (this.canMoveDown()) {
    this.y += 40;
  }
};

Frog.prototype.moveLeft = function() {
  if (this.canMoveLeft()) {
    this.x -= 40;
  }
};

Frog.prototype.canMoveUp = function() {
  return (this.y > 0);
};

Frog.prototype.canMoveRight = function() {
  return (this.x < 600 - this.width);
};

Frog.prototype.canMoveDown = function() {
  return (this.y < 600 - this.height);
};

Frog.prototype.canMoveLeft = function() {
  return (this.x > 0);
};

module.exports = Frog;
