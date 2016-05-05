var config = require('./config');
var color = require('./color');


function Fractal(size, coord, ctx, func) {
  this.size = size;
  this.coord = coord;
  this.ctx = ctx;
  this.func = func;
  this.matrix = []	//matrix holding escape distance
  this.argmatrix = [] //matrix holding escape arguments
  for (var i=0; i<size; i++) {
    this.matrix[i] = [];
    this.argmatrix[i] = [];
    for (var j=0; j<size; j++) {
      this.matrix[i][j] = 0;
      this.argmatrix[i][j] = 0;
    }
  }
}

Fractal.prototype = {
  generateFractal: function() {
    for (var i=0; i<this.matrix.length; i++) {
      for (var j=0; j<this.matrix.length; j++) {
        var val=this.func(this.coord.getDblX(i), this.coord.getDblY(j));
        this.matrix[i][j] = val.escDist;
        this.argmatrix[i][j] = val.arg;
      }
    }
  },
  paintFractal : function(palette, mandelColor) {
    var imgd = this.ctx.getImageData(0,0,this.size,this.size);
    var pix = imgd.data;

    if (config.selectedCol=='argument'){
      for (var i=0; i<this.size; i++) {
        for (var j=0; j<this.size; j++) {
          var iOffset = 4 * (j * this.size + i);
          pix[iOffset] = palette.linearColoring(this.argmatrix[i][j])[0];
          pix[iOffset+1] = palette.linearColoring(this.argmatrix[i][j])[1];
          pix[iOffset+2] = palette.linearColoring(this.argmatrix[i][j])[2];
          pix[iOffset+3] = 255;
        }
      }
    } else {
      var func;
      if (config.selectedCol=='linear'){
        func = palette.linearColoring;
      } else if (config.selectedCol=='logarithmic'){
        func = palette.logColoring;
      } else {
        func = palette.sinColoring;
      }
      for (var i=0; i<this.size; i++) {
        for (var j=0; j<this.size; j++) {
          var iOffset = 4 * (j * this.size + i);
          if (this.matrix[i][j]==config.maxIt){
            pix[iOffset] = mandelColor.red;
            pix[iOffset+1] = mandelColor.green;
            pix[iOffset+2] = mandelColor.blue;
            pix[iOffset+3] = 255;
          } else {
            pix[iOffset] = func.call(palette, this.matrix[i][j])[0];
            pix[iOffset+1] = func.call(palette, this.matrix[i][j])[1];
            pix[iOffset+2] = func.call(palette, this.matrix[i][j])[2];
            pix[iOffset+3] = 255;
          }
        }
      }
    }
    this.ctx.putImageData(imgd, 0, 0);
  }
}


//calculate the argument at escape point
function getArgument(x,y){
  var arg;
  var theta=Math.atan2(y, x);
      var maxIt = config.maxIt;
      var w = (theta+Math.PI)/(2*Math.PI)*maxIt;
      if (w<0) {
        arg = 0;
      } else if (maxIt<w) {
        arg = maxIt;
      } else {
        arg = Math.floor(w);
      }
  return arg;
}

function mb(x, y){
  var oldX = 0, oldY = 0;
  var newX = 0, newY = 0;
  var i = 0;
  var maxIt = config.maxIt;
  while (i<maxIt && (newX * newX + newY * newY) < 4){
    newX = oldX * oldX - oldY * oldY + x;
    newY = 2 * oldX * oldY + y;
    oldX = newX;
    oldY = newY;
    i += 1;
  }
  var value = new Object();
      value.escDist = i;
      value.arg = getArgument(newX, newY)
  return value;
}

function julia(x, y){
  var oldX = x, oldY = y;
  var newX = 0, newY = 0;
  var i = 0;
  var maxIt = config.maxIt;
  var cx = config.julia.cx;
  var cy = config.julia.cy;
  while (i<maxIt && (newX * newX + newY * newY) < 4){
    newX = oldX * oldX - oldY * oldY + cx;
    newY = 2 * oldX * oldY + cy;
    oldX = newX;
    oldY = newY;
    i += 1;
  }
  var value = new Object();
      value.escDist = i;
      value.arg = getArgument(newX, newY)
  return value;
}

module.exports = {
  Fractal: Fractal,
  getArgument: getArgument,
  mb: mb,
  julia: julia
}
