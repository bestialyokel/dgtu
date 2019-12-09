#include <iostream>
using namespace std;

class Cat
{
	friend Cat *create(const char* name);
	friend void delClass(Cat &name);
	Cat(const char* name)
	{
		cout << "Вход в конструктор" << endl;
		cout << "Выход из конструктора" << endl;
	};
	Cat(Cat & name) {};

	~Cat()
	{
		cout << "Вход в деструктор" << endl;
		cout << "Выход из деструктора" << endl;
	};

};

Cat *create(const char* name = "Кузя")
{
	return new Cat(name);
};

void delClass(Cat &name)
{
	delete &name;
};

int main()
{
	setlocale(LC_ALL, "RUS");
	Cat *CatClass = create();
	delClass(*CatClass);
	system("pause");
	return 0;
}
