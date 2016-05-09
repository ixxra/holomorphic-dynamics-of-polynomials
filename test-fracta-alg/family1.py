from __future__ import division
import numpy as np


def getArg(x, y):
  maxIt = 1000
  theta = np.arctan2(y, x);

  w = (theta+ np.pi)/(2*np.pi)*maxIt;
  if w < 0:
    arg = 0;
  elif maxIt < w:
    arg = maxIt;
  else:
    arg = np.floor(w);

  return arg;



def mb4(x, y):
    oldX = (y**2 - x**2)/4
    oldY = -x*y/2;
    newX = 0
    newY = 0
    i = 0;
    maxIt = 1000;

    for i in xrange(maxIt):
      if newX*newX + newY*newY >= 4:
        break

      newX = x*oldX**2 - x*oldY**2 - 2*y*oldX*oldY + oldX**4 - 6*oldX**2*oldY**2 + oldY**4;
      newY = 2*x*oldX*oldY + y*oldX**2 - y*oldY**2 + 4*oldX**3*oldY - 4*oldX*oldY**3;
      oldX = newX;
      oldY = newY;

    return i;


def julia4(x, y, bx, by):
    oldX = x
    oldY = y
    newX = 0
    newY = 0
    i = 0;
    maxIt = 1000;

    for i in xrange(maxIt):
      if newX*newX + newY*newY >= 4:
        break

      newX = bx*oldX**2 - bx*oldY**2 - 2*by*oldX*oldY + oldX**4 - 6*oldX**2*oldY**2 + oldY**4;
      newY = 2*bx*oldX*oldY + by*oldX**2 - by*oldY**2 + 4*oldX**3*oldY - 4*oldX*oldY**3;
      oldX = newX;
      oldY = newY;

    return i;



def testMb():
    '''
    This is far from optimal and is not vectorized, but it is useful to test that
    the code in javascript will calculate the fractal accurately.
    '''
    x, y = np.linspace(-4,4, 256), np.linspace(-4,4,256)
    X, Y = np.meshgrid(x, y)
    fractal = np.zeros(X.shape)
    for i in range(x.size):
      for j in range(y.size):
        s, t = x[i], y[j]
        fractal[i, j] = mb4(s, t)

    import matplotlib.pyplot as plt
    plt.imshow(fractal)


def testJulia():
    '''
    This is far from optimal and is not vectorized, but it is useful to test that
    the code in javascript will calculate the fractal accurately.
    '''
    x, y = np.linspace(-4,4, 256), np.linspace(-4,4,256)
    X, Y = np.meshgrid(x, y)
    fractal = np.zeros(X.shape)
    for i in range(x.size):
      for j in range(y.size):
        s, t = x[i], y[j]
        fractal[i, j] = julia4(s, t, 0.6, 0.8)

    import matplotlib.pyplot as plt
    plt.imshow(fractal)




def testWithImg():
  x = np.linspace(-4, 4, 256)
  y = np.linspace(-4, 4, 256)

  X, Y = np.meshgrid(x, y)
  fractal = np.zeros(X.shape)

  with open('test-img-py.pgm','w') as f:
    f.write('P2\n{size} {size}\n255\n'.format(size=256))
    for i in range(x.size):
      for j in range(y.size):
        s, t = x[i], y[j]
        color = int(np.floor(255*(mb4(s, t) - 1)/999))
        f.write(str(color) + '\n')
        #f.write(' ')
      #f.write('\n')


def testJuliaWithImg():
  xmin = -4.0
  xmax = 4.0
  ymin = -4.0
  ymax = 4.0

  size = 256

  deltax = (xmax - xmin)/(size - 1)
  deltay = (ymax - ymin)/(size - 1)

  x = xmin
  y = ymin

  bx = -1.859375
  by = 0.015625

  with open('test-julia-py.pgm', 'w') as f:
    f.write('P2\n{size} {size}\n255\n'.format(size=256))

    for i in xrange(size):
      y = ymin
      for j in xrange(size):
        v = julia4(x,y, bx, by)
        color = int(np.floor(255*(v - 1)/999))
        f.write(str(color) + '\n')
        y += deltay
      x += deltax


testJuliaWithImg()

