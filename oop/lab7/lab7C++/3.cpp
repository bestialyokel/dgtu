#include <iostream>

using namespace std;

/*template <typename T>
T Sum(T x, T y) 
{
	if (is_arithmetic <T>::value) 
	{ 
		cout << x + y << endl;
		return x + y;
	} 
	cout << "Переменная недопустимого типа!" << endl;
}

template <typename T> 
T Sum(T* x, T* y)
{
	if (is_pointer <T*>::value == true) 
	{
		cout << x[0] + y[0] << endl;
		return x[0] + y[0];
	}
}*/

template <typename T>
auto Sum(T x, T y) {
	
		

	if constexpr(is_pointer<T>::value)
		return x[0]+y[0];
	else 
		return x+y;
}

int main3() {
	setlocale(LC_ALL, "");
	double x = 1.25, y = 1.75, z;
	z = Sum(x, y);

	int a = 2, b = 5, c;
	c = Sum(a, b);

	float m = 5.32, n = 5.1, k;
	k = Sum(m, n);

	char c1 = 'a', c2 = 'b', c3;
	c3 = Sum(c1, c2);

	int A[] = { 5,6,2 };
	int B[] = { 3,7,8 }, C;
	C = Sum(A, B);

	system("pause");
	return 0;
}
