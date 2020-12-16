import matplotlib.pyplot as plt


class LabThree:
    def __init__(self):
        self.N = 100
        self.r = 1.0  # число Куранта
        self.teta = [1] * self.N
        self.alp = [0] * self.N
        self.bet = [1] * self.N
        self.a = [0] * self.N
        self.b = [0] * self.N
        self.c = [0] * self.N
        self.f = [0] * self.N

    def create_graphic(self):
        h = 1.0 / (self.N - 1)
        tau = self.r * h * h    
        stime = 0.0
        teta0 = 1.0  # нач температура не используется т.к мы в тете сделали все единицы изначально
        Bio = 2.0  # число био
        Toc = 0.0  # темп на правой границе
        Hvne = 3.0  # коэф теплоотдачи в окр среду
        Q = 10.0  # интенсивность источника тепла


        while (stime < tau * 3000.0):
            stime += tau
    
            for i in range(self.N - 1):
                self.a[i] = self.r
                self.b[i] = -2 * self.r - 1.0 - Hvne * tau
                self.c[i] = self.r
                self.f[i] = -self.teta[i] - Q * tau * (1.0 - h * (i - 1))
    
            for i in range(1, self.N - 1):
                self.alp[i] = -self.a[i] / (self.b[i] + self.c[i] * self.alp[i - 1])
                self.bet[i] = (self.f[i] - self.bet[i - 1] * self.c[i]) / (self.b[i] + self.c[i] * self.alp[i - 1])
    
            self.teta[self.N - 1] = (Bio * Toc * h + self.bet[self.N - 2]) / (1.0 - self.alp[self.N - 2] + Bio * h)
    
            for i in range(self.N - 2, 0, -1):
                self.teta[i] = self.alp[i] * self.teta[i + 1] + self.bet[i]

    def output_graphic(self):
        self.create_graphic()
        x = [0.0] * self.N
        y = [0.0] * self.N
        for i in range(self.N):
            x[i] = i
            y[i] = self.teta[i]
    
        fig = plt.figure()
        l1 = plt.plot(x, y)
        fig.legend((l1), ('Line'))
        plt.show()


LabThree().output_graphic()

