#include <cstdio>
#include <iostream>
#include <string.h>

using namespace std;
class Cat {
	char* name;
	static int count;
public:
	Cat(const char* n="Кузя") {
		cout << endl;
		cout << "Вход в конструктор класса" << endl;
		name = strdup(n);
		count++;
		cout << "Выход из конструктора класса" << endl;
		
	}
	static int out() {
		return count;
	}

	Cat(Cat &x) {
		cout << "Вход в конструктор копирования класса" << endl; 
		name = strdup(x.name);
		count++;
		cout << "Выход из конструктора копирования класса" << endl;
	}
	~Cat() {
		cout << "Вход в деструктор класса" << endl;
		free(name);
		count--;
		system("pause");
		cout << "Выход из деструктора класса" << endl;
	}
}; 
int Cat::count;

int main() {
	setlocale(LC_ALL, "Russian");
	cout << "Вход в функцию main()" << endl; 
	Cat mas[3];
	cout << "Создано объектов: " << mas->out() << endl;
	Cat *obj = new Cat;
	cout << "Создано объектов: " << obj->out() << endl;
	delete obj;
	cout << "Создано объектов: " << obj->out() << endl;
	cout << "Выход из функции main()" << endl;
	system("pause");
}