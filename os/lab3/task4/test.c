#include <stdio.h>
#include <stdlib.h>


int main(int argc, char **argv) {
    printf("%s%s\n", "i'm a child proccess : ", argv[1]);
    exit(0);
    return 0;
}
