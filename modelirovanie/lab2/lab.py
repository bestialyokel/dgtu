import numpy as np
import matplotlib.pyplot as plt

#входные данные
N = 150
h = 1
T = 3
t = 0.05
t0 = 0
a = 0.9

y = a*t/h
if y > 1:
    raise ValueError('y > 1')


prev = [0] * N
cur = [0] * N
next_ = [0] * N


#начальное заполнение
def reset():
    global N, h, T, t0, a, y, prev, cur, next_
    for i in range(N):
        if 20 - i < 0:
            prev[i] = 0
            cur[i] = 0
            next_[i] = 0
        else:
            prev[i] = 1
            cur[i] = 1
            next_[i] = 1


    t0 = 0
    #prev[0] = 1
    #cur[0] = 1

reset()

def ugol():
    global N, h, T, t0, a, y, prev, cur, next_
    while True:
        for i in range(1, N):
            next_[i] = cur[i] - y * (cur[i] - cur[i-1])
        
        prev = cur.copy()
        cur = next_.copy()
        
        t0 += t

        if t0 > T:
            break

    return cur.copy()


def centr():
    global N, h, T, t0, a, y, prev, cur, next_
    while True:
        for i in range(1, N-1):
            next_[i] = cur[i] - y * (cur[i+1] - cur[i-1]) / 2
        
        prev = cur.copy()
        cur = next_.copy()
        
        t0 += t

        if t0 > T:
            break

    return cur.copy()

def kabare():
    global N, h, T, t0, a, y, prev, cur, next_
    while True:
        for i in range(1, N-1):
            next_[i] = cur[i] - cur[i-1] + prev[i-1] - 2 * y * (cur[i] - cur[i+1])
        
        prev = cur.copy()
        cur = next_.copy()
        
        t0 += t

        if t0 > T:
            break

    return cur.copy()

def hz():
    global N, h, T, t0, a, y, prev, cur, next_
    while True:
        for i in range(1, N-1):
            next_[i] = cur[i] - (prev[i] - prev[i-1]) / 2 - (cur[i+1] + 4*cur[i] - 5*cur[i-1]) / 4
        
        prev = cur.copy()
        cur = next_.copy()
        
        t0 += t

        if t0 > T:
            break

    return cur.copy()


x = np.linspace ( start = 0.    # lower limit
                , stop = N      # upper limit
                , num = int(N/h)      # generate N/h  points between 0 and T
                )
u = ugol()
reset()

c = centr()
reset()

k = kabare()
reset()

h = hz()
reset()




#h(20-x)
hx = [0] * N
for i in range(N):
    if 20 - i < 0:
        hx[i] = 0
    else:
        hx[i] = 1




plt.plot(x, hx, '#000000', label='h(20-x')
plt.plot(x, u, '-r')
plt.plot(x, c, '-g')

#чета расходятся

#plt.plot(x, k, '-b')
#plt.plot(x, h, '-y')


plt.title('уравнение переноса, схемы бегущего счета');

plt.show()
