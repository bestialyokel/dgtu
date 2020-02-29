#include <iostream>
#include <vector>

using namespace std;

class A
{
	int a = 10;

public:
	void Inc() { a++; }

	void tree()
	{
		cout << "Нестатический метод класса\n";
	}

	void operator()()
	{
		cout << "Оператор () класса\n";
	}
};

template <typename T>
class Menu
{
	struct item_menu
	{
		string name;
		T(*fun)();
	};

	vector <item_menu> menu;

public:
	void ShowMenu()
	{
		int a;
		
		while (true)
		{
			for (int i = 0; i < menu.size(); ++i) cout << i + 1 << ": " << menu[i].name << endl;

			cout << "0: Выход" << endl;
			cout << "Выберите пункт меню: ";
			cin >> a;
			if (!a) return;
			if (a > menu.size()) continue;
			menu[a - 1].fun();
		}
	}

	void PushItem(string name, T fun())
	{
		item_menu a = { name, fun };
		menu.push_back(a);
	}

	static void Two() 
	{
		cout << "Вызвана функция класса A\n";
		A m;
		m.Inc();
	}
};

void one() 
{
	cout << "Вызвана функция 1\n";
};


template <typename T>
class Menu2
{
	struct item_menu 
	{
		string name;
		void(T::* fun)();
	};
	
	T* obj = new T();
	
	vector <item_menu> menu;

public:
	void ShowMenu() 
	{
		int a;
		while (true) 
		{
			for (int i = 0; i < menu.size(); ++i) cout << i + 1 << ": " << menu[i].name << endl;
			
			cout << "0: Выход" << endl;
			cout << "Выберите пункт меню: ";
			cin >> a;
			if (!a) return;
			if (a > menu.size()) continue;
			(obj->*menu[a - 1].fun)();
		}
	}

	void PushItem(string name, void(T::* fun)())
	{
		item_menu a = { name, fun };
		menu.push_back(a);
	}
};

int main() 
{
	setlocale(LC_ALL, "rus");

	Menu <void> m;
/*	m.PushItem("Функция 1", one);
	m.PushItem("Функция класса A", Menu<int>::Two);
	m.ShowMenu();*/

	Menu2 <A> m2;
	m2.PushItem("Нестатический метод", &A::tree);
	m2.PushItem("Оператор ()", &A::operator());
	m2.ShowMenu();
	system("pause");
	return 0;
};