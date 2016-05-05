var config = require('./config');
var Coord = require('./coord');



class Component {
  constructor(canvas, resetButton, fractal, palette, mandelColor){
    this.resetButton = resetButton;
    this.zoomCanvas = canvas;
    this.fractal = fractal;
    this.resetButton.addEventListener('click', this.reset.bind(this));
    this.palette = palette;
    this.mandelColor = mandelColor;

    this.fX = 0;
    this.fY = 0;
    this.lX = -1;
    this.lY = 0; //lX used as flag for rectangle being drawn or not
    this.drawFilledSquare=false;
    this.xMin = 0;
    this.xMax = 0;
    this.yMin = 0;
    this.yMax = 0;


    this.zoomCanvas.addEventListener('mousedown', (function(e){
      this.drawFilledSquare=true;
      this.fX=e.pageX-e.currentTarget.offsetLeft;
      this.fY=e.pageY-e.currentTarget.offsetTop;
    }).bind(this));

    this.zoomCanvas.addEventListener('mousemove', (function(e){
      if (this.lX!=-1 && this.drawFilledSquare) {
        this.invertFilledSquare(this.fX, this.fY, this.lX, this.lY,
          e.currentTarget.width, e.currentTarget.getContext("2d")); //erase last drawn rectangle
      }
      this.lX = e.pageX - e.currentTarget.offsetLeft;
      this.lY = e.pageY - e.currentTarget.offsetTop;
      if (this.drawFilledSquare) {
        this.invertFilledSquare(this.fX, this.fY, this.lX, this.lY,
          e.currentTarget.width, e.currentTarget.getContext("2d"));
      }
    }).bind(this));

    this.zoomCanvas.addEventListener('mouseup', (function(e){
      this.finishMouseMove();
    }).bind(this));

    this.zoomCanvas.addEventListener('mouseleave', (function(e){
      this.finishMouseMove();
    }).bind(this));

    fractal.generateFractal();
    fractal.paintFractal(palette, mandelColor);
  }

  reset () {
    let fractal = this.fractal;
    fractal.coord.dblXmin = -2.0;
    fractal.coord.dblXmax = 2.0;
    fractal.coord.dblYmin = -2.0;
    fractal.coord.dblYmax = 2.0;
    fractal.generateFractal();
    fractal.paintFractal(this.palette, this.mandelColor);
  }

  finishMouseMove (){
    if (!this.drawFilledSquare) return false;
    this.drawFilledSquare=false;
    if ((this.lX==this.fX || this.lY==this.fY)) {  // it was a click, not a drag, generate julia
      //do nothing
    } else {									//zoom in
      this.fractal.coord = new Coord(this.fractal.size, this.fractal.size,
        this.fractal.coord.getDblX(this.xMin), this.fractal.coord.getDblX(this.xMax),
        this.fractal.coord.getDblY(this.yMax), this.fractal.coord.getDblY(this.yMin));
      this.fractal.generateFractal();
      this.fractal.paintFractal(this.palette, this.mandelColor);
    }
    this.lX==-1;
  }

  invertFilledSquare(x1,y1,x2,y2, size, ctx){
    var imgd=ctx.getImageData(0,0,size,size);
    var pix=imgd.data;
    var xSide=Math.abs(x2-x1);
    var ySide=Math.abs(y2-y1);
    var side = (xSide<ySide) ? xSide : ySide; //shortest side becomes side of square
    if (x2>x1) {    //the coordinates from mousedown are always at one edge of the square
      this.xMin=x1;
      this.xMax=x1+side;
    } else {
      this.xMax=x1;
      this.xMin=this.xMax-side;
    }
    if (y2>y1) {
      this.yMin=y1;
      this.yMax=y1+side;
    } else {
      this.yMax=y1;
      this.yMin=this.yMax-side;
    }
    for(var y=this.yMin; y<this.yMax; y+=1){
      for(var x=size*(y-1)*4+this.xMin*4; x<size*(y-1)*4+this.xMax*4; x+=4){
          pix[x  ] = 255 - pix[x  ]; // red
          pix[x+1] = 255 - pix[x+1]; // green
          pix[x+2] = 255 - pix[x+2]; // blue
      }
    }
    ctx.putImageData(imgd, 0, 0);
  }

}

module.exports = Component;

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
