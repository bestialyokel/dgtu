#include <stdio.h>


//only int
typedef enum {
	ONE,
	TWO,
	THREE,
} ERR_CODE;

int main(void) {
	ERR_CODE a = THREE;
	printf("%d", a);
	return 0;
}
