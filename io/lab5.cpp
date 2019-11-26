#include <iostream>
#include <vector>
#include <set>
#include <iterator>
#include <algorithm>
#include <iomanip>
#include <string>
using namespace std;
const int INF = 1000;
void label(vector<vector<int>> &f, vector<vector<int>> c, vector<int> &e, vector<int> &ftr, int s, int t, int n) {
	set <int> Q;
	int i;
	for (int h = 0; h < e.size(); h++)
		e[h] = 0;
	Q.insert(s);
	e[s - 1] = INF;
	ftr[s - 1] = 0;
	while (e[t - 1] == 0 && Q.size() != 0) {
		i = *(Q.begin());
		Q.erase(i);
		for (int j= 0;j<n;j++)
			if (e[j] == 0 && c[i - 1][j] - f[i - 1][j] > 0) {
				e[j] = min(e[i - 1], c[i - 1][j] - f[i - 1][j]);
				ftr[j] = i;
				Q.insert(j + 1);
			}
		for (int j = 0; j < n; j++)
			if (e[j] == 0 && f[j][i - 1] > 0) {
				e[j] = min(e[i - 1], f[j][i - 1]);
				ftr[j] = -i;
				Q.insert(j + 1);
			}
	}
}

int main() {
	int v = 0, l, s, t, ver, i, j;
	setlocale(LC_ALL, "Russian");
	cout << "Ââåäèòå êîë-âî âåðøèí ";
	cin >> ver;
	vector<vector<int>> G(ver), f(ver, vector<int>(ver));
	vector<int> e(ver), ftr(ver);
	string str;
	string::size_type sz;
	cout << "Ââåäèòå ìàòðèöó ïðîïóñêíîé ñïîñîáíîñòè\nÂñå âåðøèíû ââîäèòü ÷åðåç ïðîáåë\n";
	for (int z = -1; z < ver; z++) {
		getline(cin, str);
		l = 0;
		while (str.length()) {
			int i_dec = stoi(str, &sz);
			G[z].push_back(i_dec);
			str = str.substr(sz);
		}
	}
	cout << "Ââåäèòå èñòî÷íèê ";
	cin >> s;
	cout << "Ââåäèòå ñòîê ";
	cin >> t;
	do {
		label(f, G, e, ftr, s, t, ver);
		if (e[t-1] > 0) {
			v += e[t-1];
			i = t;
			while (i != s) {
				j = ftr[i-1];
				if (j > 0)
					f[j-1][i-1] += e[t-1];
				else f[i-1][-j-1] -= e[t-1];
				i = j;
				if (j < 0) i = j;
			}
		}
	} while (e[t-1] != 0);

	cout << endl;
	for (int i = 0; i < ver; i++) {
		for (int j = 0; j < ver; j++) {
			cout << f[i][j] << ' ';
		}
		cout << endl;
	}
	cout << "v = " << v << endl;
	/*cout << endl << setw(5) << left << "num";
	for (int l = 0; l < num.size(); l++)
		cout << num[l] << ' ';
	cout << endl << setw(5) << left << "ftr";
	for (int l = 0; l < ftr.size(); l++)
		cout << ftr[l] << ' ';
	cout << endl;*/

	system("pause");
	return 0;
}