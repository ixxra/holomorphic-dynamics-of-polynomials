# Mandelbrot and Julia fractals


This is a remake of code made by Malin Christersson, [http://www.malinc.se/testinghtml5/juliaUsingHtml5.html](http://www.malinc.se/testinghtml5/juliaUsingHtml5.html).

I rewrote the code in his webpage in a more modular fashion,
using [browserify](http://browserify.org/) and [jade](http://jade-lang.com/)/[pug]().

The source code is located in `app` folder, under `src` and `views`.

The painting and user interaction can be located in `fractalComponent.js`.

If you want to modify the polinomials generating Mandelbrot and Julia sets, `p(z) = z^2 + c`, you can start with `fractal.js`. Look for `mb` and `julia` functions.

The original source code was released under a creative commons license, feel free to modify.
