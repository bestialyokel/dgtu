#include <iostream>
using namespace std;

class Cat
{
	friend Cat *create(const char* name);
	friend void delClass(Cat &name);
	Cat(const char* name)
	{
		cout << "���� � �����������" << endl;
		cout << "����� �� ������������" << endl;
	};
	Cat(Cat & name) {};

	~Cat()
	{
		cout << "���� � ����������" << endl;
		cout << "����� �� �����������" << endl;
	};

};

Cat *create(const char* name = "����")
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
