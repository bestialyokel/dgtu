from math import sin, pi
import matplotlib.pyplot as plt

class Mod4:
    def __init__(self):
        self.N = 100
        self.sigma = 0.5
        self.ht = 0.1
        self.hx = 1
        self.k = 1

    # 0 - 1 график, 1000 - 3 график, 2000 - 6 график
    def function(self, t, T):
        n = len(t)
        for j in range(T):
            c = [1]
            f = [sin((pi * j * self.ht) / 100)]
            a = [0]
            b = [0]

            for i in range(1, n - 1):
                c.append((1 / self.ht) + (2 * self.k) / pow(self.hx, 2) * self.sigma)
                b.append(self.k / pow(self.hx, 2) * self.sigma)
                a.append(b[i])
                f.append(t[i] / self.ht + (1 - self.sigma) * self.k * (t[i + 1] - 2 * t[i] + t[i - 1]) / pow(self.hx, 2))

            last = n - 1

            a.append(self.k / pow(self.hx, 2))
            b.append(0)
            c.append((1 / self.ht) + (0.1 * self.k / self.hx) + self.k / pow(self.hx, 2))
            f.append(t[last] / self.ht - self.k * (t[last] - t[last]) / pow(self.hx, 2) + self.k * (0.2 - 0.1 * t[last]) / self.hx)

            alpha = [0]
            beta = [0]

            for i in range(0, n - 1):
                alpha.append(b[i] / (c[i] - a[i] * alpha[i]))
                beta.append((f[i] + a[i] * beta[i]) / (c[i] - a[i] * alpha[i]))
            t[last] = (f[last] + a[last] * beta[last]) / (c[last] - a[last] * alpha[last])

            for i in reversed(range(0, last)):
                t[i] = beta[i + 1] + alpha[i + 1] * t[i + 1]

        return t

    def output_grafic(self):
        T = [0] * int(self.N * 0.4) + [1] * int(self.N * 0.2) + [0] * int(self.N * 0.4)
        t = int(input('Enter time: '))

        result_set = self.function(T, t)

        plt.grid()
        plt.plot(result_set, 'b', linewidth=2, linestyle="-")
        plt.ylim(0, 1)
        plt.xlim(0, len(T))
        plt.show()


if __name__ == "__main__":
    a = Mod4()
    a.output_grafic()
