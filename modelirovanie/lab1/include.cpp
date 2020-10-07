#include <iostream>
#include <math.h>

#include "include.h"

double rk4(const Kosh &task) {
    double x = task.x0;
    double y = task.y0;

    double k1,k2,k3,k4;

    for (decltype(task.steps) i = 0; i < task.steps; i++) {
        k1 = task.f(x, y);
        k2 = task.f(x + (task.h / 2), y + ( task.h * k1 / 2 ) );
        k3 = task.f(x + (task.h / 2), y + ( task.h * k2 / 2 ) );
        k4 = task.f(x + task.h, y + (task.h * k3));
        y = y + task.h * (k1 + k2 + k3 + k4) / 2;

        #ifdef DEBUG
            std::cout << "it: " << i << " x: " << x << " y: " << y << std::endl;
        #endif

        x = x + task.h;
    }

    return y;
}

double rk2(const Kosh &task) {

    double x = task.x0;
    double y = task.y0;

    double y0;
    for (decltype(task.steps) i = 0; i < task.steps; i++) {

        y0 = y + task.h * task.f(x, y);
        y = y + task.h * (task.f(x, y) + task.f(x + task.h, y0));

        #ifdef DEBUG
            std::cout << "it: " << i << " x: " << x << " y: " << y << std::endl;
        #endif

        x = x + task.h;
    }

    return y;
}

double euler(const Kosh &task) {
    double x = task.x0;
    double y = task.y0;

    for (decltype(task.steps) i = 0; i < task.steps; i++) {

        y = y + task.h * task.f(x, y);

        #ifdef DEBUG
                std::cout << "it: " << i << " x: " << x << " y: " << y << std::endl;
        #endif

        x = x + task.h;

    }

    return y;
}

