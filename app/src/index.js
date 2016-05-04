var color = require('./color');
var config = require('./config');
var $ = require('jquery');


$(document).ready(function (){
  var mandelColor = new color.MandelCol(0,0,0);
  var pal = new color.Palette('#000', '#ff0000' , '#000');

  pal.paint(document.getElementById(config.paletteCanvas));

  var maxIt = 1000; //maximum number of iterations
  var selectedCol = 'logarithmic'; //default colouring
  var cx = -0.6;	//default point for generating julia set
  var cy = 0.6;

});
