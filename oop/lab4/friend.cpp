#include <iostream>

using namespace std;

class A {
    private:
        void print() {
            cout << "A private method" << endl;
        }
    public: 
         friend class B;
};

class B {
    public:
        void print(A &a) {
            cout << "B private method, calls A private method" << endl;
            a.print();
        }
};

int main() {
    A a;
    B b;
    b.print(a);
}