#include <stdio.h>

int main() {
  int a = 1;
  int *b = &a;
  int &c = a;
  printf("%d", *(b+1));
  printf("%p", &c);
  return 0;
}

