function Logs (x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

Logs.prototype.draw = function() {
  this.context.fillStyle = 'rosybrown';
  this.context.drawImage(log1, this.x, this.y, this.width, this.height);
  return this;
};

Logs.prototype.floatRight = function() {
  if (this.x > 600){
    this.x = -300;
  }
  return (this.x++);
};


module.exports = Logs;
