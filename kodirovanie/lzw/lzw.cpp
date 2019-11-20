    #include <iostream>
    #include <cstdio>
    #include <fstream>
    #include <string>
    #include <locale>
    #include <cstdlib>

    using namespace std;

    int ASCII = 255;

    struct LZW
    {
    string wk; //Âõîäíàÿ ôðàçà WK
    string code; //Êîä äëÿ W
    int pos; //Ïîçèöèÿ ñëîâàðÿ 255+
    };

    string line;
    int cnt;


    void outputTxt(LZW out[], int Max)
    {
    ofstream txt;
    txt.open("output.txt");
    for (int j = 0; j < Max; j++)
    {
    for (int i = 0; i < out[j].code.length(); i++)
    {
    txt « out[j].code[i];
    }
    }

    txt.close();
    }


    void lzwCompres(string tempPtr)
    {
    for (int i = 0; i < tempPtr.length(); i++)
    {
    if (tempPtr[i] == ' ')
    {
    tempPtr[i] = '_';
    }
    }

    string tempWk;

    char w, k;
    int countResult = 0;

    LZW *result = new LZW[tempPtr.length()];
    w = tempPtr[0];
    for (int j = 1; j <= tempPtr.length(); j++)
    {
    k = tempPtr[j];
    tempWk += w;
    tempWk += k;
    bool flag = false;
    int tempPos = 0;
    int count = 1;
    for (int q = 0; q < countResult; q++)
    {
    if (result[q].wk == tempWk)
    {
    w = k;
    k = tempPtr[j + count];
    count++;
    tempWk += k;
    tempPos = result[q].pos;
    flag = true;
    q = 0;
    }

    }
    result[countResult].wk = tempWk;
    result[countResult].pos = ++ASCII;
    if (flag)
    {
    result[countResult].code = to_string(tempPos);
    j += count - 1;

    }
    else
    {
    result[countResult].code += w;

    }
    w = k;
    cout « result[countResult].wk « " " « result[countResult].code « " " « result[countResult].pos « endl;
    countResult++;
    tempWk.clear();
    }

    ASCII = 255;

    outputTxt(result, tempPtr.length ());
    }

    void lzwDeCompres(string line)
    {
    LZW *Decomp = new LZW[line.length()];
    string number;
    int flagCnt = 0;
    int countAscii = 0;

    Decomp[0].wk = line[0];
    Decomp[0].pos = ASCII + countAscii;
    Decomp[0].code = Decomp[0].wk;

    cout « endl;
    cout « endl;
    cout « endl;

    for (int i = 1; i < line.length(); i++)
    {
    countAscii++;

    if ((line[i] >= '0' && line[i] <= '9'))
    {
    for (int j = 0; j < 3; j++)
    {
    number += line[i + j];
    }
    i += 2;

    flagCnt = stoi(number);

    for (int j = 0; j < countAscii; j++)
    {
    if (flagCnt == Decomp[j].pos)
    {
    Decomp[countAscii].wk += Decomp[j].wk;
    Decomp[countAscii].code += Decomp[j].wk;
    Decomp[countAscii].pos = ASCII + countAscii;
    break;
    }
    }

    }
    else
    {
    Decomp[countAscii - 1].wk += line[i];

    Decomp[countAscii].wk += line[i];
    Decomp[countAscii].code = line[i];
    Decomp[countAscii].pos = ASCII + countAscii;
    }


    cout « Decomp[countAscii-1].wk « " " « Decomp[countAscii-1].code « " " « Decomp[countAscii-1].pos « endl;
    number.clear();

    }
    }

    void inputOut()
    {
    string ptr;

    ifstream in;
    in.open("output.txt");

    if (in.is_open())
    {
    while (getline(in, ptr))
    {
    cout « ptr « endl;
    }
    }

    in.close();

    lzwDeCompres(ptr);
    }

    void inputTxt()
    {
    string ptr;

    ifstream in;
    in.open("input.txt");

    if (in.is_open())
    {
    while (getline(in, ptr))
    {
    cout « ptr « endl;
    }
    }

    in.close();

    ofstream inm;
    inm.open("decoder.txt");
    for (int i = 0; i < ptr.length(); i++)
    {
    inm « ptr[i];
    }
    inm.close();


    lzwCompres(ptr);
    }


    int main()
    {
    //setlocale(LC_ALL, "Russian");
    int c;
    inputTxt();
    inputOut();
    cin » c;
    }