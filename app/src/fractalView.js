var fractal = require('./fractal');
var coord = require('./coord');


/*
* function initFractalView(mandelbrotCanvas, juliaCanvas)
* @mandelbrotCanvas: canvas element where to paint Mandelbrot set.
* @juliaCanvas: canvas element where to paint Julia set.
*/
/*function initFractalView(mandelbrotCanvas, juliaCanvas){
  var size = mandelbrotCanvas.width;
  var mbCoord = new coord.Coord(size, size, -2.0, 2.0, -2.0, 2.0);
  var ctx = mandelbrotCanvas.getContext("2d");
  var mbFractal = new fractal.Fractal(size, mbCoord, ctx, fractal.mb);
  size = juliaCanvas.width;
  var juliaCoord = new Coord(size, size, -2.0, 2.0, -2.0, 2.0);
  ctx = juliaCanvas.getContext("2d");
  var juliaFractal = new Fractal(size, juliaCoord, ctx, fractal.julia);

  return {julia: {fractal: juliaFractal, coord: juliaCoord},
    mandelbrot: {fractal: mbFractal, coord: mbCoord}};
}*/


class FractalView {
  constructor(canvas, fractalGenerator) {
    var size = canvas.width;
    this.size =size;
    this.coord = new coord.Coord(size, size, -2.0, 2.0, -2.0, 2.0);
    var ctx = canvas.getContext('2d');
    this.fractal = new fractal.Fractal(size, this.coord, ctx, fractalGenerator);
  }
}

module.exports = FractalView;
