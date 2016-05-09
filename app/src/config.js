module.exports = {
  components: {
    mandelbrot: {id: 'mb', resetButton: {class: 'reset'}},
    julia: {id: 'julia', resetButton: {class: 'reset'}},
    palette: {id: 'palette'}
  },
  maxIt: 1000,
  selectedCol: 'locarithmic',
  julia: {cx: -0.6, cy: 0.6},
  julia4: {cx: 0, cy: 1}
}
