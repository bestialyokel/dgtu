#include <stdio.h>


#define INPUT "input.txt"
#define OUTPUT "output.txt"

int main() {
    FILE *f;
    f = fopen(INPUT, "r+");
    char a[10];

    while (!feof(f)) {
        fgets(a, 10, f);
        printf("%d ", a[1]);
    }
    return 0;
}
