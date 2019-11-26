#include <iostream>
using namespace std;

int ram[128] = { 0 }; //min memory block is 2 byte

int* takeMemory();
void deleteMemory(int* adr[], int);


int main()
{
	int* pt_size_block = 0;
	int count = 0;
	int size = 0;
	int choose = -1, adr_elem = 0;
	int *pt = NULL;
	int* adresses[128] = { 0 };
	while (choose != 0)
	{
		cout << "1. Take memory" << endl;
		cout << "2. Delete last block" << endl;
		cout << "3. Iformation list" << endl;
		cin >> choose;
		switch (choose)
		{
		case 1:
			pt = takeMemory();
			if (pt != NULL)
			{
				adresses[adr_elem] = pt;
				adr_elem += 1;
			}
			break;
		case 2:
			if (pt != NULL)
			{
				adr_elem -= 1;
				deleteMemory(adresses, adr_elem);
				adresses[adr_elem] = NULL;
				if (adresses[adr_elem - 1] != NULL)
				{
					pt = adresses[adr_elem - 1];
				}
			}
			break;
		case 3:
			system("cls");
			cout << "Total memory used - ";
			for (int i = 0; i < 128; i++)
			{
				if (ram[i] != 0)
				{
					count += 1;
				}
				else
				{
					break;
				}
			}
			cout << count * 2 << endl;
			count = 0;
			cout << "Total memory unused - ";
			for (int i = 0; i < 128; i++)
			{
				if (ram[i] == 0)
				{
					count += 1;
				}
			}
			cout << count * 2 << endl;
			count = 0;
			cout << "Addresses of used memory: " << endl;
			for (int i = 0; i < 128; i++)
			{
				if (adresses[i] != NULL)
				{
					cout << adresses[i] << endl;
					count += 1;
				}
			}
			if (adresses[0] == NULL)
				cout << "None" << endl;
			cout << "Number of memory blocks - " << count << endl;
			count = 0;
			cout << "Size of memory blocks: " << endl;
			for (int i = 0; i < 128; i++)
			{
				if (ram[i + 1] == 0 || i == 127)
				{
					pt_size_block = &ram[i + 1];
					break;
				}
			}
			for (int i = 0; i < 128; i++)
			{
				if (adresses[i + 1] == NULL)
				{
					count = i;
					cout << (pt_size_block - adresses[count]) * 2 << endl;
					break;
				}
			}
			for (count; count > 0; count--)
			{
				cout << (adresses[count] - adresses[count - 1]) * 2 << endl;
			}
			break;
		default:
			break;
		}
		
	}
	for (int i = 0; i < 128; i++)
	{
		adresses[i] = NULL;
	}
	system("pause");
	return 0;
}

int* takeMemory()
{
	int mem_size, buff = 0, iter_max;

	for (int i = 0; i < 128; i++)
	{
		if (ram[i] == 1 && ram[i + 1] == 0)
		{
			buff = i + 1;
			break;
		}
	}

	cout << "Input memory size: ";
	cin >> mem_size;
	iter_max = buff + mem_size / 2;

	if (mem_size % 2 != 0)
	{
		iter_max += 1;
	}

	for (int i = buff; i < iter_max; i++)
	{
		if (iter_max < 129)
			ram[i] = 1;
		else
		{
			cout << "Not enough memory" << endl;
			return NULL;
		}
	}

	for (int i = 0; i < 128; i++)
	{
		cout << ram[i] << " ";
	}
	cout << endl;

	cout << "Block adress: " << &ram[buff] << endl;

	return &ram[buff];
}

void deleteMemory(int* adr[], int adr_elem)
{
	int save = 0;
	int* pt = adr[adr_elem];
	for (int i = 0; i < 128; i++)
	{
		if (&ram[i] == pt)
		{
			save = i;
			
			do
			{
				ram[save] = 0;
				save += 1;
			} while (ram[save] != 0);
			break;
		}
	}
	for (int i = 0; i < 128; i++)
	{
		cout << ram[i] << " ";
	}
	cout << endl;
}