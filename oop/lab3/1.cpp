#include <cstdio>
#include <iostream>
#include <string.h>

using namespace std;
class Cat {
	char* name;
	static int count;
public:
	Cat(const char* n="����") {
		cout << endl;
		cout << "���� � ����������� ������" << endl;
		name = strdup(n);
		count++;
		cout << "����� �� ������������ ������" << endl;
		
	}
	static int out() {
		return count;
	}

	Cat(Cat &x) {
		cout << "���� � ����������� ����������� ������" << endl; 
		name = strdup(x.name);
		count++;
		cout << "����� �� ������������ ����������� ������" << endl;
	}
	~Cat() {
		cout << "���� � ���������� ������" << endl;
		free(name);
		count--;
		system("pause");
		cout << "����� �� ����������� ������" << endl;
	}
}; 
int Cat::count;

int main() {
	setlocale(LC_ALL, "Russian");
	cout << "���� � ������� main()" << endl; 
	Cat mas[3];
	cout << "������� ��������: " << mas->out() << endl;
	Cat *obj = new Cat;
	cout << "������� ��������: " << obj->out() << endl;
	delete obj;
	cout << "������� ��������: " << obj->out() << endl;
	cout << "����� �� ������� main()" << endl;
	system("pause");
}