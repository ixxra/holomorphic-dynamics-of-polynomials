var config = require('../config');
var getArgument = require('../fractal').getArgument;


  function mb4(x, y) {
    var oldX = (Math.pow(y,2) - Math.pow(x,2))/4;
    var oldY = -x*y/2;
    var newX = 0, newY = 0;
    var i = 0;
    var maxIt = 1000;
    while (i<maxIt && (newX * newX + newY * newY) < 16){
      newX = x*Math.pow(oldX,2) - x*Math.pow(oldY,2) - 2*y*oldX*oldY + Math.pow(oldX,4) - 6*Math.pow(oldX,2)*Math.pow(oldY,2) + Math.pow(oldY,4);
      newY = 2*x*oldX*oldY + y*Math.pow(oldX,2) - y*Math.pow(oldY,2) + 4*Math.pow(oldX,3)*oldY - 4*oldX*Math.pow(oldY,3);
      oldX = newX;
      oldY = newY;
      i = i + 1;
    }
    var value = new Object();
        value.escDist = i;
        value.arg = getArgument(newX, newY);
    return value;
  }


  function julia4(x, y){
    var oldX = x, oldY = y;
    var newX = 0, newY = 0;
    var i = 0;
    var maxIt = config.maxIt;
    var cx = config.julia4.cx;
    var cy = config.julia4.cy;
    while (i<maxIt && (newX * newX + newY * newY) < 16){
      newX = cx*Math.pow(oldX,2) - cx*Math.pow(oldY,2) - 2*cy*oldX*oldY + Math.pow(oldX,4) - 6*Math.pow(oldX,2)*Math.pow(oldY,2) + Math.pow(oldY,4);
      newY = 2*cx*oldX*oldY + cy*Math.pow(oldX,2) - cy*Math.pow(oldY,2) + 4*Math.pow(oldX,3)*oldY - 4*oldX*Math.pow(oldY,3);
      oldX = newX;
      oldY = newY;
      i += 1;
    }
    var value = new Object();
    value.escDist = i;
    value.arg = getArgument(newX, newY)
    return value;
  }


function test (){
  var size = 256;
  var xmin = -4, xmax = 4;
  var ymin = -4, ymax = 4;

  var fs = require('fs');
  var stream = fs.createWriteStream('test-img.pgm');

  var deltax = (xmax - xmin)/size;
  var deltay = (ymax - ymin)/size;


  var x = xmin, y = ymin;

  for (var i = 0; i < size; i++){
    x = x + deltax;
    for (var j = 0; j < size; j++) {
        y = y + deltay;
        var val = mb4(x, y);
        stream.write(String(val.escDist));
        stream.write(' ');
    }
    stream.write('\n');
  }

  stream.end();
}

module.exports = {
  mb4: mb4,
  julia4: julia4,
  test: test
}
