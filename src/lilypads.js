function LilyPad (x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

LilyPad.prototype.draw = function() {
  this.context.drawImage(lilypad, this.x, this.y, this.width, this.height);
  return this;
};


module.exports = LilyPad;
