//var $ = require('jquery');

module.exports = class Component {
  constructor(palette, canvas) {
    this.canvas = canvas;
    this.palette = palette;
  }

  paint () {
    this.palette.paint(this.canvas);
  }
}

/*
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
*/
