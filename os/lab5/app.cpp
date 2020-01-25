#include <iostream>
#include <fstream>
#include <math.h> 
#include <conio.h>

using namespace std;

char* area;
const int n=32;
const int size_bl = 16;
//запись в файл
void writeFile()
{
	ofstream file("hdd.txt",ios::out);
	for(int i=0;i<n;i++)
	{
		file << "| "<<area[i]<<" ";
	}
	file.close();
}
//чтение из файла
void readFile()
{
	ifstream file("hdd.txt",ios::in);
	for(int i=0;i<n;i++)
		file>>area[i];
	file.close();
}
//начальная инициализация блока
void init()
{
	for(int i=0;i<n;i++)
		area[i]='=';
}
//проверка блока
int CheckBlock(int countBlock)
{
	int i,j;
	for (i=0; i<n-countBlock; i++)
	{
		if (area[i] == '=')
		{
			for (j = i; j < countBlock + i; j++)
			{
				if (area[j] == '=')
					continue;
				else
					break;
			}
			if (j - i == countBlock )
				return i;
		}
	}
	return -1;
}
//очистка блока
void freeBlock(int StartBlock, int blockCount)
{
	if (area[StartBlock] == '=') cout << "Невозможно освободить свободные блоки" << endl;
	else{
		for (int i = StartBlock; i<blockCount; i++)
		{
			area[i]='=';
		}
		cout << "Освобождено" << endl;
	}
}


//запись в блок
void setBlock(int start, int count)
{
	char value;
	cout<<"Введите имя записи"<<endl;
	cin>>value;
	for (int i=0;i<count;i++)
	{
		area[start++]=value;
	}
}
//чтение из блока
void readBlock(int start,int count)
{
	for (int i=0;i<count;i++)
		cout<<area[start++];
}
//показать сожержимое блока
void printBlock()
{
	for(int i=0;i<n;i++)
		cout<<"| "<<area[i]<<" ";
}

int findBlock(char ch){
	int num=-1;
	for (int i = 0; i < n;)
	{
		if (area[i] == ch) {
			num = i; break;
		}
		else i++;
	}
	return num;
}

int colDelBlock(char ch){
	int num = 0;
	for (int i = 0; i < n;)
	{
		if (area[i] == ch) {
			num ++;
			i++;
		}
		else i++;
	}
	return num;
}

int colEemp(){
	int col = 0;
	for (int i = 0; i < n; )
	{
		if (area[i] == '=') {
			col++; i++;
		}
		else i++;
	}
	return col;
}

int colFull(){
	int col = 0;
	for (int i = 0; i < n; )
	{
		if (area[i]!= '=') {
			col++; i++;
		}
		else i++;
	}
	return col;
}

void printInfo(){
	cout << "Размер блока " << size_bl << endl;
	cout << "Общее количество блоков " << n << endl;
	cout << "Количество пустых блоков " << colEemp() << endl;
	cout << "Количество занятых блоков " << colFull() << endl;
}

int main()
{
	
	setlocale(LC_ALL,"Russian");
	area = new char[n];
	init();
	writeFile();
	int key = 0;
	while(true)
	{
		system("cls");
		cout<<"Выберите действие"<<endl;
		cout<<"1-выделить блоки и записать в них данные"<<endl;
		cout<<"2-освобождение блоков"<<endl;
		cout<<"3-чтение данных из блоков "<<endl;
		cout<<"4-просмотр организации блоков"<<endl;
		cout<<"5-инициализация"<<endl;
		cout << "6-информации о состоянии блочного пространства" << endl;
		cout << "7-завершение транзакции" << endl;
		cout << "8-откат транзакции" << endl;
		try
		{
			key = getch() - 48;
			cout << key << endl;
		}
		catch (const std::exception&)
		{
			cout << "Введены неверные значения" << endl;
		}
		switch (key) 
		{
			case 1:system("cls");
				int count_block, number_block, size_inf;
				cout<<"Размер информации для записи в файл"<<endl;
				cin >> size_inf;
				if (size_inf % size_bl != 0){
					count_block = ceil(size_inf / size_bl+0.5);
				}
				else count_block = size_inf / size_bl;
				number_block = CheckBlock(count_block);
				if (number_block == -1)
				{
					cout<<"Данное количество блоков невозможно захватить"<<endl;
					system("pause");
					break;
				}
				else
				{
					cout<<count_block<<" блоков захвачено начиная с позиции "<<number_block<<endl;
					setBlock(number_block,count_block);
				}
				system("pause");
				break;
			case 2:system("cls");
				int start_block,
					countblock;
				char name_rec;
				cout<<"какую запись необходимо удалить?"<<endl;
				cin >> name_rec;
				start_block = findBlock(name_rec);
				countblock = colDelBlock(name_rec) + start_block;
				freeBlock(start_block,countblock);
				system("pause");
				break;

			case 3: system("cls");
				int st,	cnt;
				cout<<"Сколько читать?"<<endl;
				cin>>cnt;
				cout<<"Откуда?"<<endl;
				cin>>st;
				readBlock(st,cnt);
				system("pause");
				break;
			case 4:system("cls");
				cout << endl;
				printBlock();
				cout << endl;
				cout << endl;
				
				system("pause");
				break;
			case 5:system("cls");
				init();
				cout<<"Инициализированно"<<endl;
				system("pause");
				break;
			case 6:system("cls");
				printInfo();
				cout << endl;
				cout << endl;
				system("pause");
				break;
			case 7:system("cls");
				writeFile();
				cout << endl;
				cout << endl;
				system("pause");
				break;
			case 8:system("cls");
				init();
				writeFile();
				cout << endl;
				cout << endl;
				system("pause");
				break;
		}
	}

	system("pause");
	return 0;
}