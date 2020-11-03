#include <iostream>

#pragma once

#define DEBUG

typedef struct {
    double (*f)(double, double);
    double x0;
    double y0;
    double h;
    size_t steps;
} Kosh;

double rk4(const Kosh&);
double rk2(const Kosh&);
double euler(const Kosh&);

