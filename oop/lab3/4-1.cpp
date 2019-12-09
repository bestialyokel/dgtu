#include <iostream>
using namespace std;

class Singleton1 {
	Singleton1() {}
	~Singleton1() {}

	static Singleton1 *one;

public:
	static Singleton1 *getX() {
		cout << "get one" << endl;
		if (!one)
			Singleton1 *one = new Singleton1;
		return one;
	}
};

class Singleton2 {
	Singleton2() {}
	~Singleton2() {}

	static Singleton2 *two;

public:
	static Singleton2 *createY() {
		if (!two)
			two = new Singleton2;
		return two;
	}

	static void deleteY(Singleton2 *) {
		delete two;
		two = 0;
	}
};

Singleton2 *Singleton2::two;
Singleton1 *Singleton1::one = Singleton1::getX();


int main() {
	cout << "Main in" << endl;
	cout << "4.2" << endl;
	Singleton2 *Otwo = Singleton2::createY();
	Singleton2 *Ttwo = Singleton2::createY();
	cout << (Otwo == Ttwo) << endl;
	Singleton2::deleteY(Ttwo);
	system("pause");
	
}