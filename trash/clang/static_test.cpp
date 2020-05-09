#include <iostream>

// я думал смогу вызвать abc..
class test {
    public:
        static void abc(test a) {
            std::cout << &a;
        }
};

int main(void) {
    test a;
    test::abc(a);
    return 0;
}