
function linearColoring(m){
  var n = Math.floor((palSize-1)*m/maxIt);
        return colors[n];
}

function logColoring(m){
  var d1=Math.log(m+1);
        var d2=Math.log(maxIt+1);
        var n=Math.floor((palSize-1)*d1/d2);
        return colors[n];
}

function sinColoring(m){
  var d1=(Math.sin(m)+1)/2;
        var n=Math.floor(palSize*d1);
        return colors[n];
}

function MandelCol(red, green, blue) {
  this.red = red;
  this.green = green;
  this.blue = blue;
}

var palSize = 512;
var colors = new Array(palSize);
for (var i=0; i<palSize; i+=1) {
  colors[i] = new Array(3);
}
var currentColor = new Object();
var pal = new Palette('#000', '#ff0000' , '#000')
paintPalette();

function Palette(left, mid, right) {
  this.left = left;
  this.mid = mid;
  this.right = right;
}


function paintPalette() {
  var ctx5 = document.getElementById("palCanvas").getContext("2d");
  var lingrad=ctx5.createLinearGradient(0,0,palSize,0);
  lingrad.addColorStop(0, pal.left);
  lingrad.addColorStop(0.5, pal.mid);
  lingrad.addColorStop(1,pal.right);
  ctx5.fillStyle=lingrad;
  ctx5.fillRect(0,0,palSize,20);
  //make the color array from imagedata
  var imgd = ctx5.getImageData(0,0,palSize,1);
  var pix = imgd.data;
  for (var i=0; i<palSize; i+=1 ){
    colors[i][0] = pix[i*4];
    colors[i][1] = pix[i*4+1];
    colors[i][2] = pix[i*4+2];
  }
};

module.exports = {
  linear: linearColoring,
  log: logColoring,
  sin: sinColoring
};
