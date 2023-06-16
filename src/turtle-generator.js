var Turtles = require('./turtles');

var TurtleGenerator = function(context) {
  this.one = [];
  this.two = [];
  this.three = [];
  this.one.push(new Turtles(200, 200, 50, 35, context));
  this.one.push(new Turtles(260, 200, 50, 35, context));
  this.one.push(new Turtles(320, 200, 50, 35, context));
  this.one.push(new Turtles(500, 200, 50, 35, context));
  this.one.push(new Turtles(560, 200, 50, 35, context));
  this.one.push(new Turtles(620, 200, 50, 35, context));
  this.two.push(new Turtles(390, 120, 50, 35, context));
  this.two.push(new Turtles(450, 120, 50, 35, context));
  this.two.push(new Turtles(510, 120, 50, 35, context));
  this.two.push(new Turtles(690, 120, 50, 35, context));
  this.two.push(new Turtles(750, 120, 50, 35, context));
  this.two.push(new Turtles(810, 120, 50, 35, context));
  this.three.push(new Turtles(200, 40, 50, 35, context));
  this.three.push(new Turtles(260, 40, 50, 35, context));
  this.three.push(new Turtles(320, 40, 50, 35, context));
  this.three.push(new Turtles(500, 40, 50, 35, context));
  this.three.push(new Turtles(560, 40, 50, 35, context));
  this.three.push(new Turtles(620, 40, 50, 35, context));
  this.all = [this.one, this.two, this.three];
};

module.exports = TurtleGenerator;
