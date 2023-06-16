var Logs = require('./logs.js');

var LogGenerator = function(context) {
  this.one = [];
  this.two = [];
  this.three = [];
  this.one.push(new Logs(0, 240, 100, 35, context));
  this.one.push(new Logs(-200, 240, 100, 35, context));
  this.one.push(new Logs(-400, 240, 100, 35, context));
  this.two.push(new Logs(0, 160, 300, 35, context));
  this.three.push(new Logs(-100, 80, 100, 35, context));
  this.three.push(new Logs(-360, 80, 100, 35, context));
  this.three.push(new Logs(-560, 80, 100, 35, context));
  this.all = [this.one, this.two, this.three];
};

module.exports = LogGenerator;
