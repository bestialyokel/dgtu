#include <iostream>
#include <stdlib.h>
#include <string>
#include <stdlib.h>

using namespace std;

struct Node
{
int Value;
Node *Next, *Prev;
};

void Add(Node **First, Node **Last, int val)
{
Node*Vsp = new Node, *Tmp;
int k = 0;
Vsp->Value = val;
Vsp->Next = NULL;
if (!*First)
{
Vsp->Prev = NULL;
*First = Vsp;
*Last = Vsp;
}
else
{
Tmp = *First;
while (Tmp != NULL)
{
if (Tmp->Value == Vsp->Value) k++;

if (Tmp->Next == NULL && k == 0)
{
Vsp->Prev = *Last;
(*Last)->Next = Vsp;
*Last = Vsp;
}
Tmp = Tmp->Next;
}
}

}

void Delete(Node **First, Node **Last, int val)
{
Node*Vsp = *First, *Tmp;
if ((*First)->Value == val && (*First)->Next != NULL)
{
*First = (*First)->Next;
(*First)->Prev = NULL;
delete(Vsp);
return;
}
else if ((*First)->Next == NULL && (*First)->Value == val)
{
(*First)->Next = NULL;
*First = NULL;
delete *First;
return;
}

if ((*Last)->Value == val)
{
Tmp = *Last;
*Last = (*Last)->Prev;
(*Last)->Next = NULL;
delete Tmp;
return;
}

Tmp = *First;

while (Tmp != NULL)
{
Node *Tmp2;
if (Tmp->Value == val)
{
Tmp2 = Tmp;
Tmp2->Prev->Next = Tmp->Next;
Tmp2->Next->Prev = Tmp->Prev;
delete Tmp;
return;
}
Tmp = Tmp->Next;
}
}

void ArrayOut(Node *First)
{
Node*Vsp = First;
if (Vsp == NULL)cout << "Множество пустое!" << endl;
else
{
while (Vsp != NULL)
{
cout << Vsp->Value << " ";
Vsp = Vsp->Next;
}
cout << endl;
}
}

void Combination(Node *First1, Node *First2)
{
Node *Tmp1 = First1, *Tmp2 = First2, *Tmp;
int arr[100], j = 0, k = 0;

while (Tmp1)
{
k = 0;
for (int i = 0; i < j; i++) if (arr[i] == Tmp1->Value) k++;
if (k == 0)
{
arr[j] = Tmp1->Value;
j++;
}
Tmp1 = Tmp1->Next;
}

while (Tmp2)
{
k = 0;
for (int i = 0; i < j; i++) if (arr[i] == Tmp2->Value) k++;
if (k == 0)
{
arr[j] = Tmp2->Value;
j++;
}
Tmp2 = Tmp2->Next;
}

for (int i = 0; i < j; i++) cout << arr[i]<< " ";

cout << endl;
}

void Intersection(Node **First1, Node **First2)
{
Node *Tmp1 = *First1, *Tmp2 = *First2, *Tmp;
int arr[100], j = 0, k = 0;

while (Tmp1)
{
Tmp2 = *First2;

while (Tmp2)
{
if (Tmp2->Value == Tmp1->Value)
{
arr[j] = Tmp1->Value;
j++;
}

Tmp2 = Tmp2->Next;
}

Tmp1 = Tmp1->Next;
}

for (int i = 0; i < j; i++) cout << arr[i] << " ";

cout << endl;
}


int main() {
setlocale(LC_CTYPE, "rus");

Node *First1 = NULL, *First2 = NULL, *Last1 = NULL, *Last2 = NULL, *Com = NULL;
int n = 0, val = 0;

do {
cout << "1. Добавить в первое множество:" << endl;
cout <<"2. Добавить во второе множество:" << endl;
cout <<"3. Удалить из первого множества" << endl;
cout << "4. Удалить из второго множества" << endl;
cout << "5. Вывести первое множество" << endl;
cout << "6. Вывести второе множество" << endl;
cout << "7. Объединить два множества" << endl;
cout << "8. Пересечение двух множеств" << endl;
cout << "0. Выход" << endl;
cin >> n;
switch (n)
{
case 1:
cout << "Введите элемент на добавление: ";
cin >> val;
Add(&First1, &Last1, val);
cout << "Выполнено!" << endl;
system("pause");
system("cls");

break;

case 2:
cout << "Введите элемент на добавление";
cin >> val;
Add(&First2, &Last2, val);
cout << "Выполнено!" << endl;
system("pause");
system("cls");

break;

case 3:
cout <<"Введите элемент, который хотите удалить: ";
cin >> val;
Delete(&First1, &Last1, val);
cout << "Выполнено!" << endl;
system("pause");
system("cls");

break;
case 4:
cout << "Введите элемент, который хотите удалить: ";
cin >> val;
Delete(&First2, &Last2, val);
cout << "Выполнено!" << endl;
system("pause");
system("cls");

break;
case 5:
cout << "Элементы первого множества: " << endl;
ArrayOut(First1);
cout << endl;
system("pause");
system("cls");

break;
case 6:
cout << "Элементы второго множества: " << endl;
ArrayOut(First2);
cout << endl;
system("pause");
system("cls");

break;

case 7:
cout << "Объединение: " << endl;
Combination(First1, First2);
system("pause");
system("cls");

break;

case 8:
cout << "Пересечение: " << endl;
Intersection(&First1, &First2);
system("pause");
system("cls");

break;

case 0:
break;

default: cout << "Ошибка!" << endl; break;
}
} while (n != 0);
return 0;
}