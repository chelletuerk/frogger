var LilyPad = require('./lilypads');

var LilyPadsGenerator = function(context) {
  this.one = [];
  this.one.push(new LilyPad(5, 0, 60, 40, context));
  this.one.push(new LilyPad(137, 0, 60, 40, context));
  this.one.push(new LilyPad(269, 0, 60, 40, context));
  this.one.push(new LilyPad(401, 0, 60, 40, context));
  this.one.push(new LilyPad(533, 0, 60, 40, context));
  return this.one;
};

module.exports = LilyPadsGenerator;
