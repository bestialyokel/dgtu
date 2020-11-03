from time import time
def qsort1(list):
    if list == []:
        return []
    else:
        pivot = list[0]
        lesser = qsort1([x for x in list[1:] if x < pivot])
        greater = qsort1([x for x in list[1:] if x >= pivot])
        return lesser + [pivot] + greater
class lab3:
    time_bubble = ''
    iteration_bubble = 0
    comparisons_bubble = 0
    change_bubble = 0
    time_inclusion = ''
    iteration_inclusion = 0
    comparisons_inclusion = 0
    change_inclusion = 0
    time_swap = ''
    iteration_swap = 0
    comparisons_swap = 0
    change_swap = 0
    quicksort_time = 0
    def __init__(self):
        pass

    def bubble_sort(self, mass, N):
        self.mass = mass.copy()
        lab3.iteration_bubble = 0
        lab3.comparisons_bubble = 0
        lab3.change_bubble = 0
        for i in range(N - 1):
            x = self.mass[i]
            k = i
            for j in range(i + 1, N):
                if self.mass[j] < x:
                    k = j
                    x = self.mass[j]
                lab3.comparisons_bubble += 1
                lab3.iteration_bubble += 1
            self.mass[k] = self.mass[i]
            self.mass[i] = x
            lab3.change_bubble += 1
        print(self.mass)
        self.mass = mass.copy()
        lab3.time_bubble = time()
        for i in range(N - 2):
            x = self.mass[i]
            k = i
            for j in range(i + 1, N - 1):
                if self.mass[j] < x:
                    k = j
                    x = self.mass[j]
            self.mass[k] = self.mass[i]
            self.mass[i] = x
        lab3.time_bubble = str((time() - lab3.time_bubble))[0:9]

    def direct_inclusion(self, mass, N):
        self.mass = mass.copy()
        lab3.iteration_inclusion = 0
        lab3.comparisons_inclusion = 0
        lab3.change_inclusion = 0
        for i in range(N - 1):
            x = self.mass[i]
            j = i - 1
            while ((x < self.mass[j]) and (j >= 0)):
                self.mass[j + 1] = self.mass[j]
                j = j - 1
                lab3.change_inclusion += 1
                lab3.comparisons_inclusion += 1
                lab3.iteration_inclusion += 1
            self.mass[j + 1] = x
        self.mass = mass.copy()
        lab3.time_inclusion = time()
        for i in range(N):
            x = self.mass[i]
            j = i - 1
            while ((x < self.mass[j]) and (j >= 0)):
                self.mass[j + 1] = self.mass[j]
                j = j - 1
            self.mass[j + 1] = x
        print(self.mass)
        lab3.time_inclusion = str(time() - lab3.time_inclusion)[0:9]

    def direct_swap(self, mass, N):
        self.mass = mass.copy()
        lab3.iteration_swap = 0
        lab3.comparisons_swap = 0
        lab3.change_swap = 0
        for i in range(N - 1):
            for j in range(N - 1, i, -1):
                if self.mass[j - 1] > self.mass[j]:
                    x = self.mass[j - 1]
                    self.mass[j - 1] = self.mass[j]
                    self.mass[j] = x
                    lab3.change_swap += 1
                lab3.comparisons_swap += 1
                lab3.iteration_swap += 1
        print(self.mass)
        lab3.time_swap = time()
        self.mass = mass.copy()
        for i in range(N - 1):
            for j in range(N - 1, i, -1):
                if self.mass[j - 1] > self.mass[j]:
                    x = self.mass[j - 1]
                    self.mass[j - 1] = self.mass[j]
                    self.mass[j] = x
        lab3.time_swap = str(time() - lab3.time_swap)[0:9]

    def quicksort(self, mass):
        self.mass = mass.copy()
        lab3.quicksort_time = time()
        qsort1(self.mass)
        lab3.quicksort_time = str(time() - lab3.quicksort_time)[0:9]

    def res(self):
        print(' ' * 10, 'iterations      comparisons     changes          time')
        print('bubble:   ', lab3.iteration_bubble, ' ' * (14-(len(str(lab3.iteration_bubble)))),
              lab3.comparisons_bubble, ' ' * (14-(len(str(lab3.comparisons_bubble)))),
              lab3.change_bubble, ' ' * (15-(len(str(lab3.change_bubble)))),
              lab3.time_bubble, ' ' * (15-(len(str(lab3.time_bubble))))
              )
        print('inclusion:', lab3.iteration_inclusion, ' ' * (14-(len(str(lab3.iteration_inclusion)))),
              lab3.comparisons_inclusion, ' ' * (14-(len(str(lab3.comparisons_inclusion)))),
              lab3.change_inclusion, ' ' * (15-(len(str(lab3.change_inclusion)))),
              lab3.time_inclusion, ' ' * (15-(len(str(lab3.time_inclusion))))
              )
        print('swaps:    ', lab3.iteration_swap, ' ' * (14-(len(str(lab3.iteration_swap)))),
              lab3.comparisons_swap, ' ' * (14-(len(str(lab3.comparisons_swap)))),
              lab3.change_swap, ' ' * (15-(len(str(lab3.change_swap)))),
              lab3.time_swap, ' ' * (15-(len(str(lab3.time_swap))))
              )
        print('quicksort:', ' '*48, lab3.quicksort_time)
