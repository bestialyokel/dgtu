#include <iostream>
#include <math.h>

#include "include.h"

Kosh task = {
    [](double x, double y) -> double { return -2 * y + exp(-x) + cos(2*x); },
    0,
    3,
    0.5,
    10,
};

auto fsol = [](double x, double y) -> double {
    return 1;
};

double exact() {
    double x = task.x0;
    double y = task.y0;

    for (decltype(task.steps) i = 0; i < task.steps; i++) {

        y = y + task.h * task.f(x, y);

        #ifdef DEBUG
                std::cout << "it: " << i << " x: " << x << " y: " << y << std::endl;
        #endif

        x = x + task.h;

    }
}

int main(void) {
    std::cout << "euler" << std::endl;
    std::cout << euler(task) << std::endl;
    std::cout << "Runge-Kutta 2" << std::endl;
    std::cout << rk2(task) << std::endl;
    std::cout << "Runge-Kutta 4" << std::endl;
    std::cout << rk4(task) << std::endl;
    
}