

 function mb4(x, y) {
    var oldX = (Math.pow(y,2) - Math.pow(x,2))/4;
    var oldY = -x*y/2;
    var newX = 0, newY = 0;
    var i = 0;
    var maxIt = 1000;
    while (i<maxIt && (newX * newX + newY * newY) < 4){
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

function getArgument(x,y){
  var arg;
  var theta=Math.atan2(y, x);
      var maxIt = 1000;
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


function test (){
  var size = 256;
  var xmin = -4, xmax = 4;
  var ymin = -4, ymax = 4;

  var fs = require('fs');
  var stream = fs.createWriteStream('test-img.pgm');

  stream.write('P2\n' + size + ' ' + size + '\n' + '255\n');

  var deltax = (xmax - xmin)/(size - 1);
  var deltay = (ymax - ymin)/(size - 1);


  var x = xmin, y = ymin;

  for (var i = 0; i < size; i++){
    y = ymin;
    for (var j = 0; j < size; j++) {
        var val = mb4(x, y);
        var color = Math.floor(255 * (val.escDist - 1) / 999);
        stream.write(String(color) + '\n');
        y = y + deltay;
    }
    //stream.write('\n');
    x = x + deltax;
  }
  stream.end();
}

test();
