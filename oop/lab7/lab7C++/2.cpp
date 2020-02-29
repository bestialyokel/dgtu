#include <iostream>

using namespace std;

class  MyClass
{
	int num;

public:
	MyClass(int tmp) 
	{
		num = tmp;
	}
	
	MyClass() 
	{
		num = 0;
	}
	
	bool operator >(MyClass tmp) 
	{
		return this->num > tmp.num;
	}
};

/*class A
{

};*/

const char* Max(const char* s1, const char* s2) 
{
	cout << "fun" << endl;
	if (strcmp(s1, s2) >= 0) return s1;
	return s2;
}

template<typename T>
T Max(T x, T y) 
{
	cout << "template" << endl;
	return x > y ? x : y;
}


int main2()
{
	
	MyClass obj1(1), obj2(2), obj3;
	
	char x = Max('a', '1');
	
	int y = Max(0, 1);
	
	const char* z = Max("Hello", "World");
	
	obj3 = Max(obj1, obj2);

	/*A a;
	A a1;

	Max(a, a1);*/
	
	system("pause");
	return 0;
}