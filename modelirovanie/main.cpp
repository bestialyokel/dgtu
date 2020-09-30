#include <iostream>
#include <math.h>

#include "include.h"

#define DEBUG

Kosh task = {
    [](double x, double y) -> double { return -2 * y + exp(-x) + cos(2*x); },
    0,
    3,
    0.5,
    10,
};

int main(void) {
    std::cout << "euler" << std::endl;
    euler(task);
    std::cout << "Runge-Kutta 2" << std::endl;
    rk2(task);
    std::cout << "Runge-Kutta 4" << std::endl;
    rk4(task);
    
}