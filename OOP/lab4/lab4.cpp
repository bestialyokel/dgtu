#include <iostream>

using namespace std;

class Test {
    friend void Z(const Test&);
    friend void fun(const Test&);

    protected:
        uint W;
    public:
        Test(uint number = 1) {
            this->W = number;
        }
};

void Z(const Test&) {
    cout << "Это закрытая ф-я класса Test" << endl;
}
void fun(const Test &a) {
    cout << a.W << endl;
    Z(a);
}


int main() {
    Test T;
    fun(T);
    return 0;
}