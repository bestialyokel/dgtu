#include <stdio.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>



int main(int argc, char **argv) {


    if ( argc != 3 ) {
        perror("using: move from to");
        exit(EXIT_FAILURE);
    }

    FILE *from, *to;

    from = fopen(argv[0], "rb");//pochemu-to 0 - ne imya ispolnyaemogo faila

    if (from == NULL) {
        perror("source file openning fail");
        exit(EXIT_FAILURE);
    }

    to = fopen(argv[1], "wb");

    if (to == NULL) {
        perror("out file openning fail");
        exit(EXIT_FAILURE);
    }

    unsigned char buffer[4096];

    while (!feof(from)) {
        int n;
        n = fread(buffer, 1, sizeof(buffer), from);
        fwrite(buffer, 1, n, to);
    }
    fclose(from);
    fclose(to);
    return 1;
}
