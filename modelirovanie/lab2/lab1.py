import matplotlib.pyplot as plt

T = 1.0
u = 0.1
N = 150
h = 1
tau = 0.001


def Heaviside(x):
    x = 20 - x
    if x < 0:
        return 0
    else:
        return 1


def left_corner():
    wht_c = wht_f = [0] * N

    wht_c[0] = Heaviside(1)
    for i in range(N):
        wht_c[i] = Heaviside(i)

    t = 0
    while (t < N):
        for i in range(1, N):
            dudx = (wht_c[i] - wht_c[i - 1]) / h
            wht_f[i] = -u * dudx * tau + wht_c[i]

        for i in range(1, N):
            wht_c[i] = wht_f[i]

        t += tau

    return wht_c


def center():
    wht_c = wht_f = [0] * N

    wht_c[0] = Heaviside(1)
    for i in range(N):
        wht_c[i] = Heaviside(i)

    t = 0
    while (t < N):
        for i in range(1, N - 1):
            dudx = (wht_c[i + 1] - wht_c[i - 1]) / 2 * h
            wht_f[i] = -u * dudx * tau + wht_c[i]

        for i in range(1, N):
            wht_c[i] = wht_f[i]

        t += tau
    return wht_c


def cabore():
    wht_c = wht_f = wht_p = [0] * N

    wht_c[0] = wht_f[0] = wht_p[0] = Heaviside(1)
    for i in range(N):
        wht_c[i] = Heaviside(i)

    t = 0
    while (t < 10):
        for i in range(1, N - 1):
            dudx = (wht_c[i] - wht_c[i - 1]) / h
            wht_f[i] = -u * dudx * 2 * tau - (wht_c[i - 1] - wht_p[i - 1]) + wht_c[i]

        for i in range(1, N):
            wht_p[i] = wht_c[i]
            wht_c[i] = wht_f[i]

        t += tau
    return wht_c


def linear_cabore():
    wht_c = wht_f = wht_p = [0] * N

    wht_c[0] = wht_f[0] = wht_p[0] = Heaviside(1)
    for i in range(N):
        wht_c[i] = Heaviside(i)

    t = 0
    while (t < 10):
        for i in range(1, N - 1):
            dudx = (wht_c[i] - wht_c[i - 1]) / h
            dudt = (wht_c[i - 1] - wht_p[i - 1])
            dudt1 = wht_f[i] - wht_c[i]
            dudt2 = (wht_c[i + 1] - wht_c[i - 1]) / 4 * h
            wht_f[i] = -u * dudx * 2 * tau - dudt - dudt1 - dudt2 * u * 2 * tau + wht_c[i]

        for i in range(1, N):
            wht_p[i] = wht_c[i]
            wht_c[i] = wht_f[i]

        t += tau
    return wht_c


def create_single_graphic():
    resultList = left_corner()
    helperList = []
    for i in range(len(resultList)):
        helperList.append(i)

    fig = plt.figure()
    l1 = plt.plot(helperList, resultList)
    fig.legend(l1, "Stream")
    plt.savefig("./image/left_corner.png")

    resultList = center()
    helperList = []
    for i in range(len(resultList)):
        helperList.append(i)

    fig = plt.figure()
    l1 = plt.plot(helperList, resultList)
    fig.legend(l1, "Stream")
    plt.savefig("./image/center.png")

    resultList = cabore()
    helperList = []
    for i in range(len(resultList)):
        helperList.append(i)

    fig = plt.figure()
    l1 = plt.plot(helperList, resultList)
    fig.legend(l1, "Stream")
    plt.savefig("./image/cabore.png")

    resultList = linear_cabore()
    helperList = []
    for i in range(len(resultList)):
        helperList.append(i)

    fig = plt.figure()
    l1 = plt.plot(helperList, resultList)
    fig.legend(l1, "Stream")
    plt.savefig("./image/linear_cabore.png")

def create_all_graphic_v2():
    y1 = left_corner()
    y2 = center()
    y3 = cabore()
    y4 = linear_cabore()
    x = []
    for i in range(len(y1)):
        x.append(i)
    fig = plt.figure()
    l1, l2, l3, l4 = plt.plot(x, y1, x, y2, x, y3, x, y4)
    fig.legend((l1, l2, l3, l4), ('left_corner', 'center', 'cabore', 'linear_cabore'))
    plt.show()

#create_single_graphic()
create_all_graphic_v2()

