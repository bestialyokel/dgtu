#include <iostream>
#include <math.h>

#include "include.h"

#define DEBUG

#define pln(x) std::cout << (x) << std::endl; 

Kosh task = {
    [](double x, double y) -> double { return -2 * y + exp(-x) + cos(2*x); },
    0,
    3,
    0.5,
    10,
};

int main(void) {
    std::cout << "euler" << std::endl;
    std::cout << euler(task) << std::endl;
    std::cout << "Runge-Kutta 2" << std::endl;
    std::cout << rk2(task) << std::endl;
    std::cout << "Runge-Kutta 4" << std::endl;
    std::cout << rk4(task) << std::endl;
    
}