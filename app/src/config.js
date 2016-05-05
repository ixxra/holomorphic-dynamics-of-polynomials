module.exports = {
  components: {
    mandelbrot: {id: 'mb', resetButton: {class: 'reset'}},
    julia: {id: 'julia', resetButton: {class: 'reset'}},
    palette: {id: 'palette'}
  },
  maxIt: 1000,
  selectedCol: 'logarithmic',
  julia: {cx: -0.6, cy: 0.6}
}
