var config = require('./config');

module.exports = function loader(mbFractal, juliaFractal){

  /********************************************************************************/
  //the controls for the fractals
  /********************************************************************************/
  $('input[name=colouring]:radio').click(function(){
    config.selectedCol = this.value;
    mbFractal.paintFractal();
    juliaFractal.paintFractal();
  });

  $('input[name=size]:radio').click(function(){
    var newSize = this.value+'px';
    /*$('#juliaCanvas').css('width', newSize);
    $('#juliaCanvas').css('height', newSize);
    updateSize(this.value);*/
    $('#juliaCanvas').animate({
      'width' : newSize,
      'height' : newSize
    }, 500 , function(){
      updateSize(parseInt(newSize,10));
    });
  });

  $('#resetMB').click(function() {
      mbFractal.coord.dblXmin = -2.0;
    mbFractal.coord.dblXmax = 2.0;
    mbFractal.coord.dblYmin = -2.0;
    mbFractal.coord.dblYmax = 2.0;
    mbFractal.generateFractal();
    mbFractal.paintFractal();
  });

  $('#resetJulia').click(function() {
      juliaFractal.coord.dblXmin = -2.0;
    juliaFractal.coord.dblXmax = 2.0;
    juliaFractal.coord.dblYmin = -2.0;
    juliaFractal.coord.dblYmax = 2.0;
    juliaFractal.generateFractal();
    juliaFractal.paintFractal();
  });


  $('.zoomCanvas').mousedown(function(e){
    drawFilledSquare=true;
    fX=e.pageX-this.offsetLeft;
    fY=e.pageY-this.offsetTop;
  });

  $('.zoomCanvas').mousemove(function(e){
    if (lX!=-1 && drawFilledSquare) {
      invertFilledSquare(fX, fY, lX, lY, this.width, this.getContext("2d")); //erase last drawn rectangle
    }
    lX=e.pageX-this.offsetLeft;
    lY=e.pageY-this.offsetTop;
    if (drawFilledSquare) {
      invertFilledSquare(fX, fY, lX, lY, this.width, this.getContext("2d"));
    }
  });

  $('.zoomCanvas').mouseup(function(e){
    finishMouseMove(this.id);
  });

  $('.zoomCanvas').mouseleave(function(e){
    finishMouseMove(this.id);
  });


  function finishMouseMove(id){
    if (!drawFilledSquare) return false;
    drawFilledSquare=false;
    if ((lX==fX || lY==fY)) {  // it was a click, not a drag, generate julia
      if (id=='mbCanvas') {
        cx = mbFractal.coord.getDblX(lX);
        cy = mbFractal.coord.getDblY(lY);
        $('#juliaPoint').text('('+cx+' , '+cy+')');
        juliaFractal.generateFractal();
        juliaFractal.paintFractal();
       }
    } else {									//zoom in
      var fractal = (id=='mbCanvas') ? mbFractal: juliaFractal;
      fractal.coord = new Coord(fractal.size, fractal.size,
      fractal.coord.getDblX(xMin), fractal.coord.getDblX(xMax),
      fractal.coord.getDblY(yMax), fractal.coord.getDblY(yMin));
      fractal.generateFractal();
      fractal.paintFractal();
    }
    lX==-1;
  }

  function invertFilledSquare(x1,y1,x2,y2, size, ctx){
    var imgd=ctx.getImageData(0,0,size,size);
    var pix=imgd.data;
    var xSide=Math.abs(x2-x1);
    var ySide=Math.abs(y2-y1);
    var side = (xSide<ySide) ? xSide : ySide; //shortest side becomes side of square
    xMin, xMax, yMin, yMax;
    if (x2>x1) {    //the coordinates from mousedown are always at one edge of the square
      xMin=x1;
      xMax=x1+side;
    } else {
      xMax=x1;
      xMin=xMax-side;
    }
    if (y2>y1) {
      yMin=y1;
      yMax=y1+side;
    } else {
      yMax=y1;
      yMin=yMax-side;
    }
    for(var y=yMin; y<yMax; y+=1){
      for(var x=size*(y-1)*4+xMin*4; x<size*(y-1)*4+xMax*4; x+=4){
        pix[x  ] = 255 - pix[x  ]; // red
          pix[x+1] = 255 - pix[x+1]; // green
          pix[x+2] = 255 - pix[x+2]; // blue
      }
    }
    ctx.putImageData(imgd, 0, 0);
  }

  /********************************************************************************/
  //the controls for changing palette and the mandelbrot color
  /********************************************************************************/
  $('.colors').miniColors({
    change: function(hex, rgb) {
      currentColor.hex = hex;
      currentColor.red = rgb.r;
      currentColor.green = rgb.g;
      currentColor.blue = rgb.b;
    }
  });

  $('#leftButton').click(function() {
      pal.left = currentColor.hex;
      paintPalette();
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });

  $('#midButton').click(function() {
      pal.mid = currentColor.hex;
      paintPalette();
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });

  $('#rightButton').click(function() {
      pal.right = currentColor.hex;
      paintPalette();
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });

  $('#setMandelbrotColor').click(function() {
      mandelColor.red = currentColor.red;
      mandelColor.green = currentColor.green;
      mandelColor.blue = currentColor.blue;
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });


  /********************************************************************************/
  //the controls for the fractals
  /********************************************************************************/
  $('input[name=colouring]:radio').click(function(){
    selectedCol = this.value;
    mbFractal.paintFractal();
    juliaFractal.paintFractal();
  });

  $('input[name=size]:radio').click(function(){
    var newSize = this.value+'px';
    /*$('#juliaCanvas').css('width', newSize);
    $('#juliaCanvas').css('height', newSize);
    updateSize(this.value);*/
    $('#juliaCanvas').animate({
      'width' : newSize,
      'height' : newSize
    }, 500 , function(){
      updateSize(parseInt(newSize,10));
    });
  });

  $('#resetMB').click(function() {
      mbFractal.coord.dblXmin = -2.0;
    mbFractal.coord.dblXmax = 2.0;
    mbFractal.coord.dblYmin = -2.0;
    mbFractal.coord.dblYmax = 2.0;
    mbFractal.generateFractal();
    mbFractal.paintFractal();
  });

  $('#resetJulia').click(function() {
      juliaFractal.coord.dblXmin = -2.0;
    juliaFractal.coord.dblXmax = 2.0;
    juliaFractal.coord.dblYmin = -2.0;
    juliaFractal.coord.dblYmax = 2.0;
    juliaFractal.generateFractal();
    juliaFractal.paintFractal();
  });
}

/********************************************************************************/
//zoom in and pick julia point
/********************************************************************************/
var fX, fY, lX=-1, lY; //lX used as flag for rectangle being drawn or not
var drawFilledSquare=false;
var xMin, xMax, yMin, yMax;

$('.zoomCanvas').mousedown(function(e){
  drawFilledSquare=true;
  fX=e.pageX-this.offsetLeft;
  fY=e.pageY-this.offsetTop;
});

$('.zoomCanvas').mousemove(function(e){
  if (lX!=-1 && drawFilledSquare) {
    invertFilledSquare(fX, fY, lX, lY, this.width, this.getContext("2d")); //erase last drawn rectangle
  }
  lX=e.pageX-this.offsetLeft;
  lY=e.pageY-this.offsetTop;
  if (drawFilledSquare) {
    invertFilledSquare(fX, fY, lX, lY, this.width, this.getContext("2d"));
  }
});

$('.zoomCanvas').mouseup(function(e){
  finishMouseMove(this.id);
});

$('.zoomCanvas').mouseleave(function(e){
  finishMouseMove(this.id);
});


function finishMouseMove(id){
  if (!drawFilledSquare) return false;
  drawFilledSquare=false;
  if ((lX==fX || lY==fY)) {  // it was a click, not a drag, generate julia
    if (id=='mbCanvas') {
      cx = mbFractal.coord.getDblX(lX);
      cy = mbFractal.coord.getDblY(lY);
      $('#juliaPoint').text('('+cx+' , '+cy+')');
      juliaFractal.generateFractal();
      juliaFractal.paintFractal();
     }
  } else {									//zoom in
    var fractal = (id=='mbCanvas') ? mbFractal: juliaFractal;
    fractal.coord = new Coord(fractal.size, fractal.size,
    fractal.coord.getDblX(xMin), fractal.coord.getDblX(xMax),
    fractal.coord.getDblY(yMax), fractal.coord.getDblY(yMin));
    fractal.generateFractal();
    fractal.paintFractal();
  }
  lX==-1;
}

function invertFilledSquare(x1,y1,x2,y2, size, ctx){
  var imgd=ctx.getImageData(0,0,size,size);
  var pix=imgd.data;
  var xSide=Math.abs(x2-x1);
  var ySide=Math.abs(y2-y1);
  var side = (xSide<ySide) ? xSide : ySide; //shortest side becomes side of square
  xMin, xMax, yMin, yMax;
  if (x2>x1) {    //the coordinates from mousedown are always at one edge of the square
    xMin=x1;
    xMax=x1+side;
  } else {
    xMax=x1;
    xMin=xMax-side;
  }
  if (y2>y1) {
    yMin=y1;
    yMax=y1+side;
  } else {
    yMax=y1;
    yMin=yMax-side;
  }
  for(var y=yMin; y<yMax; y+=1){
    for(var x=size*(y-1)*4+xMin*4; x<size*(y-1)*4+xMax*4; x+=4){
      pix[x  ] = 255 - pix[x  ]; // red
        pix[x+1] = 255 - pix[x+1]; // green
        pix[x+2] = 255 - pix[x+2]; // blue
    }
  }
  ctx.putImageData(imgd, 0, 0);

  /********************************************************************************/
  //the controls for changing palette and the mandelbrot color
  /********************************************************************************/
  $('.colors').miniColors({
    change: function(hex, rgb) {
      currentColor.hex = hex;
      currentColor.red = rgb.r;
      currentColor.green = rgb.g;
      currentColor.blue = rgb.b;
    }
  });

  $('#leftButton').click(function() {
      pal.left = currentColor.hex;
      paintPalette();
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });

  $('#midButton').click(function() {
      pal.mid = currentColor.hex;
      paintPalette();
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });

  $('#rightButton').click(function() {
      pal.right = currentColor.hex;
      paintPalette();
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });

  $('#setMandelbrotColor').click(function() {
      mandelColor.red = currentColor.red;
      mandelColor.green = currentColor.green;
      mandelColor.blue = currentColor.blue;
      mbFractal.paintFractal();
      juliaFractal.paintFractal();
  });
}
