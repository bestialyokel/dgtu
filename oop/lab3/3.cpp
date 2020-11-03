#include <cstdio>
#include <iostream>
using namespace std;

class Cat
{
Cat(const char* name)
{
cout << "Вход в конструктор" << endl;
cout << name << endl;
cout << "Выход из конструктора" << endl;
};

~Cat()
{
cout << "Вход в деструктор" << endl;
cout << "Выход из деструктора" << endl;
};

public:

static Cat *create( const char* name="Кузя")
{
return new Cat(name);
}

static void delClass(Cat *name)
{
delete name;
}
};
int main()
{
setlocale(LC_ALL, "RUS");
Cat *Cat_Class = Cat::create();
Cat::delClass(Cat_Class);
system("pause");
return 0;
}