import numpy as np


def family(a,b):
  '''
  Generator for composition of `a*z + z^2` and `b*z + z^2`
  '''
  def p(z):
    return z**4 + 2*a*z**3 + (b + a**2)*z**2 + b*a*z
  return p


def juliaGen(p):
  def julia(x, y):
    maxIter = 1000
    for i in xrange(maxIter):
      if x*x + y*y >= 16:
        break
      z = p(complex(x, y))
      x = z.real
      y = z.imag
    return i
  return julia


def juliaMap(julia, size):
  x = np.linspace(-4, 4, size)
  y = np.linspace(-4, 4, size)
  z = np.empty(size*size)
  k = 0
  for i in xrange(size):
    for j in xrange(size):
      val = julia(x[i], y[j])
      z[k] = val
      k += 1
  return z.reshape((size, size))
