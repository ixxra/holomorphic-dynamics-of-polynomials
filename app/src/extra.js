/*
this is not ready yet
*/




/********************************************************************************/
//the mandelbrot set
/********************************************************************************/
var maxIt = 1000; //maximum number of iterations
var selectedCol = 'logarithmic'; //default colouring
var cx = -0.6;	//default point for generating julia set
var cy = 0.6;


init();

mbFractal.generateFractal();
juliaFractal.generateFractal();
mbFractal.paintFractal();
juliaFractal.paintFractal();


/********************************************************************************/
//zoom in and pick julia point
/********************************************************************************/
var fX, fY, lX=-1, lY; //lX used as flag for rectangle being drawn or not
var drawFilledSquare=false;
var xMin, xMax, yMin, yMax;
