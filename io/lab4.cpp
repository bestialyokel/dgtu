#include <iostream>
#include <vector>
#include <set>
#include <iterator>
#include <algorithm>
#include <iomanip>
#include <string>
using namespace std;

void save(int i, int j, int nZ, vector<vector<int>> &masQ, vector<int> ftr) {
	int z = i;	
	while (z != j) {
		masQ[nZ-1].push_back(z);
		z = ftr[z-1];
	}
	masQ[nZ-1].push_back(j);
	masQ[nZ-1].push_back(i);
	
}

void cycle(int i, int *k,int *nZ, vector<set<int>> G, vector<int> &num, vector<int> &ftr, vector<vector<int>> &masQ) {
	num[i-1] = ++(*k);
	for (set<int>::iterator p = G[i-1].begin(); p != G[i-1].end(); p++) {
		if (num[(*p)-1] == 0) {
			ftr[(*p)-1] = i;
			cycle((*p), k,nZ, G, num, ftr, masQ);
		}
		else if (ftr[i-1] != (*p) && num[i-1]> num[(*p)-1]) 
			save(i, (*p), ++(*nZ), masQ, ftr);
	}
}

int main() {
	int n = 0, m = 0, v, k = 0, nZ = 0;
	setlocale(LC_ALL, "Russian");
	cout << "Число вершин" << endl;
	cin >> v;
	vector<set<int>> G(v);
	vector<int> num(v), ftr(v);
	string str;
	string::size_type sz;
	cout << "введите список смежности, все вершины вводить через пробел " << endl;
	for (int z = -1; z < v; z++) {
		getline(cin, str);
		while (str.length()) {
			int i_dec = stoi(str, &sz);
			G[z].insert(i_dec);
			str = str.substr(sz);
		}
	}
	for (int z = 0; z < v; z++) {
		num[z] = 0;
		ftr[z] = 0;
		n++;
		m += G[z].size();
	}
	vector<vector<int>> masQ((m/2) - n + 1);
	cycle(1, &k, &nZ, G, num, ftr, masQ);

	cout << endl;
	for (int l = 0; l < (m / 2) - n + 1; l++) {
		copy(masQ[l].begin(), masQ[l].end(), std::ostream_iterator<int>(std::cout, " "));
		cout << endl;
	}

	/*cout << endl << setw(5) << left << "num";
	for (int l = 0; l < num.size(); l++)
		cout << num[l] << ' ';
	cout << endl << setw(5) << left << "ftr";
	for (int l = 0; l < ftr.size(); l++)
		cout << ftr[l] << ' ';
	cout << endl;*/
	
	return 0;
}                                                                                                                                                                                  