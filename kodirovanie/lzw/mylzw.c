#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define INPUT "input.txt"
#define OUTPUT "output.txt"

//проблема с таблицей


FILE *lzw_encode(FILE *input, FILE *output) {
    if (input == NULL && output == NULL) {
        perror("input || output not opened");
        return 0;
    }

    int length = 0;
    char **table = (char **)malloc(sizeof(char*) * length);

    //init table

    while(!feof(input)) {
        char buf[1] = {fgetc(input)};
        int i = -1;
        for(int j = 0; j < length; j++) {
            if (table[j] == NULL) break;
            if (strcmp(table[j], buf) == 0) {
                //printf("%s %s", table[j], buf);
                i = j;
                break;
            }
        }
        if (i == -1) {
            length++;
            table = (char **)realloc(table, sizeof(char*) * length);
            table[length -1] = buf;
            printf("%s", table[length - 1]);
            i = -1;
        }
    }

}

int main() {
    FILE *i;
    FILE *o;
    i = fopen(INPUT, "r");
    o = fopen(OUTPUT, "w");
    
    lzw_encode(i,o);

    
    return 0;
}
