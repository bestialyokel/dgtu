#include <iostream>

using namespace std;

class Test {
    friend void fun(const Test&);

    protected:
        uint W;
        void Z() {
            cout << "Это закрытая ф-я класса Test" << endl;
        }
    public:
        Test(uint number = 1) {
            this->W = number;
        }
};

void fun(const Test &a) {
    cout << a.W << endl;
    a.Z();
}


int main() {
    Test T;
    fun(T);
    return 0;
}