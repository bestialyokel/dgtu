import numpy as np
import matplotlib.pyplot as plt

#входные данные
N = 150
h = 1.0
T = 2.0
t = 0.001
a = 0.9

y = (a*t)/h

if y > 1:
    raise ValueError('y >1o 1')

def func_Heviside(x):
    return 1 if x >= 0 else 0

def f(x):
    return func_Heviside(20 - x)

def left():
    cur = [0] * N
    next_ = [0] * N
    t0 = 0

    for i in range(N):
        cur[i] = f(i)

    while (t0 < T):
        for i in range(1, N):
            next_[i] = cur[i] - y * (cur[i] - cur[i-1])

        for i in range(1, N):
            cur[i] = next_[i]

        t0 += t

    return cur

def center():
    cur = [0] * N
    next_ = [0] * N

    t0 = 0

    for i in range(N):
        cur[i] = f(i)

    while (t0 < T):
        for i in range(1, N-1):
            next_[i] = cur[i] - y * (cur[i+1] - cur[i-1]) / 2

        for i in range(1, N-1):
            cur[i] = next_[i]

        t0 += t

    return cur


def cabore():
    cur = [0] * N
    next_ = [0] * N
    prev = [0] * N

    t0 = 0

    for i in range(N):
        cur[i] = prev[i] = f(i)

    while (t0 < T):
        for i in range(1, N):
            next_[i] = cur[i] - cur[i-1] + prev[i-1] - 2 * y * (cur[i] - cur[i-1])

        for i in range(1, N):
            prev[i] = cur[i]
            cur[i] = next_[i]

        t0 += t

    return cur

def lin():
    cur = [0] * N
    next_ = [0] * N
    prev = [0] * N

    t0 = 0

    for i in range(N):
        cur[i] = prev[i] = f(i)

    while (t0 < T):
        for i in range(1, N-1):
            next_[i] = cur[i] - (cur[i-1] - prev[i-1]) / 2 - y * (cur[i+1] + 4 * cur[i] - 5 * cur[i-1]) / 4

        for i in range(1, N-1):
            prev[i] = cur[i]
            cur[i] = next_[i]

        t0 += t

    return cur

x = [i for i in range(N)]
 
hx = [0] * N
for i in range(N):
    hx[i] = f(i)

plt.plot(x, hx, '#000000')

plt.plot(x, left(), '-r')

plt.plot(x, center(), '-g')

plt.plot(x, cabore(), '-b')

plt.plot(x, lin(), '-y')

plt.legend([
    'h(20-x)',
    'left-corner',
    'central',
    'cabore',
    'lin_comb_cabore'
])

plt.title('уравнение переноса, схемы бегущего счета')

plt.show()
