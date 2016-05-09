import sympy as sp

a,b,x,y = sp.symbols('a,b,x,y')

c = a + b*sp.I
z = x + y*sp.I


p = z * (z + c) * (c**3 + 4*c**2*z + 4*c*z**2 + 8)

p = p/c
p
ans = p.expand(z).factor(sp.I)


ans


I = sp.I

real = a**4*x - 4*a**3*b*y + 5*a**3*x**2 - 5*a**3*y**2 - 6*a**2*b**2*x - 30*a**2*b*x*y + 8*a**2*x**3 - 24*a**2*x*y**2 + 4*a*b**3*y - 15*a*b**2*x**2 + 15*a*b**2*y**2 - 48*a*b*x**2*y + 16*a*b*y**3 + 4*a*x**4 - 24*a*x**2*y**2 + 8*a*x + 4*a*y**4 + b**4*x + 10*b**3*x*y - 8*b**2*x**3 + 24*b**2*x*y**2 - 16*b*x**3*y + 16*b*x*y**3 - 8*b*y + 8*x**2 - 8*y**2
imag = a**4*y + 4*a**3*b*x + 10*a**3*x*y - 6*a**2*b**2*y + 15*a**2*b*x**2 - 15*a**2*b*y**2 + 24*a**2*x**2*y - 8*a**2*y**3 - 4*a*b**3*x - 30*a*b**2*x*y + 16*a*b*x**3 - 48*a*b*x*y**2 + 16*a*x**3*y - 16*a*x*y**3 + 8*a*y + b**4*y - 5*b**3*x**2 + 5*b**3*y**2 - 24*b**2*x**2*y + 8*b**2*y**3 + 4*b*x**4 - 24*b*x**2*y**2 + 8*b*x + 4*b*y**4 + 16*x*y


def julia(x, y, a, b):
  maxIter = 1000
  for i in xrange(maxIter):
    real = a**4*x - 4*a**3*b*y + 5*a**3*x**2 - 5*a**3*y**2 - 6*a**2*b**2*x - 30*a**2*b*x*y + 8*a**2*x**3 - 24*a**2*x*y**2 + 4*a*b**3*y - 15*a*b**2*x**2 + 15*a*b**2*y**2 - 48*a*b*x**2*y + 16*a*b*y**3 + 4*a*x**4 - 24*a*x**2*y**2 + 8*a*x + 4*a*y**4 + b**4*x + 10*b**3*x*y - 8*b**2*x**3 + 24*b**2*x*y**2 - 16*b*x**3*y + 16*b*x*y**3 - 8*b*y + 8*x**2 - 8*y**2
    imag = a**4*y + 4*a**3*b*x + 10*a**3*x*y - 6*a**2*b**2*y + 15*a**2*b*x**2 - 15*a**2*b*y**2 + 24*a**2*x**2*y - 8*a**2*y**3 - 4*a*b**3*x - 30*a*b**2*x*y + 16*a*b*x**3 - 48*a*b*x*y**2 + 16*a*x**3*y - 16*a*x*y**3 + 8*a*y + b**4*y - 5*b**3*x**2 + 5*b**3*y**2 - 24*b**2*x**2*y + 8*b**2*y**3 + 4*b*x**4 - 24*b*x**2*y**2 + 8*b*x + 4*b*y**4 + 16*x*y
    x = real
    y = imag
    if x*x + y*y >= 16:
      break

  return i








