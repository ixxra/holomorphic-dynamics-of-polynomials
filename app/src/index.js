var color = require('./color');
var config = require('./config');
var fractal = require('./fractal');
var $ = require('jquery');
var fractalComponent = require('./fractalComponent');
var Coord = require('./coord');
var PaletteComponent = require('./paletteComponent');


function makeComponent(config, fractalGen, palette, mandelColor){
  var comp = document.getElementById(config.id);
  var canvas = comp.getElementsByTagName('canvas')[0];
  var resetButton = comp.getElementsByClassName(config.resetButton.class)[0];
  var size = canvas.width;
  var coord = new Coord(size, size, -2.0, 2.0, -2.0, 2.0);
  var ctx = canvas.getContext('2d');
  var frac = new fractal.Fractal(size, coord, ctx, fractalGen);
  return new fractalComponent(canvas, resetButton, frac, palette, mandelColor);
}

$(document).ready(function (){
  var mandelColor = new color.MandelCol(0,0,0);
  var pal = new color.Palette('#000', '#ff0000' , '#000');
  var palette = document.getElementById(config.components.palette.id);
  var paletteComponent = new PaletteComponent(pal, palette.getElementsByTagName('canvas')[0]);
  paletteComponent.paint();

  makeComponent(config.components.mandelbrot, fractal.mb, pal, mandelColor);
  makeComponent(config.components.julia, fractal.julia, pal, mandelColor);
});
