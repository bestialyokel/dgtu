#include <cstdio>
#include <iostream>
using namespace std;

class Cat
{
Cat(const char* name)
{
cout << "���� � �����������" << endl;
cout << name << endl;
cout << "����� �� ������������" << endl;
};

~Cat()
{
cout << "���� � ����������" << endl;
cout << "����� �� �����������" << endl;
};

public:

static Cat *create( const char* name="����")
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
