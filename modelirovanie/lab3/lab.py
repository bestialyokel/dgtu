import matplotlib.pyplot as plt

N = 100
r = 1.0
L = 0.1
alpha = 0.7
p = 0
t = 60
T0 = 20
Tl = 300
Tr = 100
temp = [1 for item in range(N)]
alp = [0 for item in range(N)]
bet = [1 for item in range(N)]
a = [0 for item in range(N)]
b = [0 for item in range(N)]
c = [0 for item in range(N)]
f = [0 for item in range(N)]


def create_graphic():
    h = 1.0 / (N - 1)
    tau = r * h * h
    Bio = 2.0
    TRight = 0.0
    Factor = 3.0
    Q = 10.0

    stime = 0.0
    while (stime < tau * 3000.0):
        stime += tau

        for i in range(N - 1):
            a[i] = r
            b[i] = -2 * r - 1.0 - Factor * tau
            c[i] = r
            f[i] = -temp[i] - Q * tau * (1.0 - h * (i - 1))

        for i in range(1, N - 1):
            alp[i] = -a[i] / (b[i] + c[i] * alp[i - 1])
            bet[i] = (f[i] - bet[i - 1] * c[i]) / (b[i] + c[i] * alp[i - 1])

        temp[N - 1] = (Bio * TRight * h + bet[N - 2]) / (1.0 - alp[N - 2] + Bio * h)

        for i in range(N - 2, 0, -1):
            temp[i] = alp[i] * temp[i + 1] + bet[i]


def output_graphic():
    create_graphic()
    x = [0.0] * N
    y = [0.0] * N
    for i in range(N):
        x[i] = i
        y[i] = temp[i]

    fig = plt.figure()
    l1 = plt.plot(x, y)
    fig.legend((l1), ('Line'))
    plt.show()


output_graphic()

