#include <stdio.h>
#include <vector>
#include <iostream>

using namespace std;

int main() {
  vector<char> v;
  v.push_back('a');
  int a = 1;
  int *b = &a;
  int &c = a;
  printf("%s", "123");
  return 0;
}

