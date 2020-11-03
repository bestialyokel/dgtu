#include <stdio.h>

#include <stdlib.h>

struct str {
    int x;
    int y;
};

int main() {
    struct str *a = {malloc( sizeof(struct str)) };

    a->x = 123;

    printf("%d", a->x);

    
}