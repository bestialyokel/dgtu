#include <iostream>

using namespace std;

class Complex {
    friend ostream& operator<<(ostream &o, Complex &c) {
        o << c.x << " " << c.y << "i";
        return o;
    }

    friend ostream& operator<<(ostream &o, Complex c) {
        o << c.x << " " << c.y << "i";
        return o;
    }

    friend istream& operator>>(istream &i, Complex &c) {
        char sign, sym;
        i >> c.x >> sign >> c.y >> sym;
        if (sign == '-') c.y = -c.y;
        return i;
    }
    public:
        int x;
        int y;
        Complex(int a = 0, int b = 0) {
            this->x = a;
            this->y = b;
        }
        Complex operator+(const Complex &c) {
            return Complex(this->x + c.x, this->y + c.y);
        }
        Complex operator-(const Complex &c) {
            return Complex(this->x - c.x, this->y - c.y);
        }
};

Complex operator-(int a, const Complex &c) {
    return Complex(a - c.x, -c.y);
}

Complex operator+(int a, const Complex &c) {
    return Complex(a + c.x, -c.y);
}


int main() {
    Complex a(1,4), b(5,-1);
    Complex c;
    cin >> c;
    cout << 9-c;
}