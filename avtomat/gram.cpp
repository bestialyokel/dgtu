#include <iostream>


#include <set>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;
using rule = pair< string, int>;

constexpr char eps = 'e';

const string delim = "->";


/*

терминалы - символы
нетерминалы - большие буквы?

*/

typedef struct {
    set<char> terminals;
    set<char> non_terminals;
    char start;

    vector< rule > rules;

} Gramm;



//https://studopedia.ru/5_83114_algoritm-proverka-sushchestvovaniya-yazika-grammatiki.html
//g dolgen bit kontektsno svobodnii, inache hz;
/*
    S->A
    A->0
    A->e
*/
//vrode yazik suschestvuet (po algoritmu), nesmotrya na eps pravila
bool exist(const Gramm &g) {
    set<char> N;

    while(1) {
        size_t count = 0;

        for (rule r : g.rules) {
            bool ruleIsOk = true;

            //esli pravilo s eps
            if (r.first.length() == 2 && r.first[1] == eps) {
                auto it = N.find(r.first[0]);
                if (it == N.end()) {
                    N.insert( r.first[0] );
                    count++;
                }
                continue;
            }

            //
            for (size_t i = r.second; i < r.first.length(); i++) {
                auto it1 = N.find( r.first[i] );
                auto it2 = g.terminals.find( r.first[i] );

                //?
                if (it1 == N.end() && it2 == g.terminals.end()) {
                    ruleIsOk = false;
                    break;
                }
            }

            //esli pravilo - ok i neterminal novii v N
            if (ruleIsOk) {
                auto it = N.find(r.first[0]);
                if (it == N.end()) {
                    N.insert( r.first[0] );
                    count++;
                }
            }
        }   

        if (count == 0)
            break;
    }
    //vrode operator== opredelen dlya set;


    auto it = N.find(g.start);


    return it != N.end();

}

bool isCFG(const Gramm &g) {
    for (rule r : g.rules) {
        //first char of rule
        auto it = g.non_terminals.find(r.first[0]);

        //dlina levoi chasti == 1, levii symbol est v neterminalah;
        if (r.second != 1 || it == g.non_terminals.end())
            return false;


        //eps est v pravoi chasti && v pravile bolshe 2 simvolov
        size_t it_eps = r.first.find(eps);
        if (it_eps != std::numeric_limits<size_t>::max() && r.first.length() > 2) {
            return false;
        }

    }
    return true;
}



void removeEpsRules(const Gramm &g) {

    //poisk eps-porojdayushih neterminalov 
    set<char> epsGeneratingNonTermnials;

    for (rule r : g.rules) {
        if (r.first.length() == 2 && r.first[1] == eps) {
            epsGeneratingNonTermnials.insert(r.first[0]);
        }
    }

    while(1) {
        int count = 0;
        for (rule r : g.rules) {
            //kajdii simvol pravila sprava est v epsGeneratingNonTerminals;
            bool isOk = true;
            for (int i = r.second; i < r.first.length(); ++i) {
                auto it = epsGeneratingNonTermnials.find(r.first[i]);
                //ne naiden 
                if (it == epsGeneratingNonTermnials.end()) {
                    isOk = false;
                    break;
                }
            }

            if (isOk) {
                //proverit est li uje symbol v mnojestve
                auto it = epsGeneratingNonTermnials.find(r.first[0]);
                if (it == epsGeneratingNonTermnials.end()) {
                    epsGeneratingNonTermnials.insert(r.first[0]);
                    count++;
                }
            }

        }

        if (count == 0) {
            break;
        }
    }

    //udalenie eps-pravil iz grammatiki

    vector< rule > newRules;


}


//ZDES OSTANOVILSA, nerrfc nedostijimie..
void removeUnreachable(const Gramm &g) {

    set<char> reachable;
    reachable.insert(g.start);

    vector<char> queue;

    queue.push_back(g.start);

    while(queue.size() != 0) {
        char nterm = queue.back();
        queue.pop_back();
        for (auto &rule : g.rules) {
            if (rule.first[0] == nterm) {
                for (auto i = rule.second; i < rule.first.length(); ++i) {
                    auto it = reachable.find(nterm);
                }
            }
        }
    }


}

void removeNonGeneratingRules(const Gramm &g) {

    vector< rule > newRules;

    set<char> N;

    while(1) {
        int count = 0;

        for (rule r : g.rules) {
        
        }
    }



}


int main(void) {
    Gramm G;

    string str;
    char sym;

    cout << "symbol <" << eps << "> zanyat dlya epsilon, ne ispolzuite ego" << endl;

    //Chtenie neterminalov
    cout << "Vvedite neterminali cherez Enter, v konce vvoda prosto Enter" << endl;

    while(1) {
        getline(cin, str);


        if (str.empty()) {
            break;
        }

        if (str.length() != 1) {
            cout << "Odin symbol" << endl;
            continue;
        }

        if (str[0] == eps) {
            cout << "e (epsilon) zarezervirovan";
            continue;
        }


        G.non_terminals.insert(str[0]);
        
    }


    //Chtenie terminalov
    cout << "Vvedite terminali cherez Enter, v konce vvoda prosto Enter" << endl;

    while(1) {
        getline(cin, str);


        if (str.empty()) {
            break;
        }

        if (str.length() != 1) {
            cout << "Odin symbol" << endl;
            continue;
        }

        if (str[0] == eps) {
            cout << "e (epsilon) zarezervirovan";
            continue;
        }

        auto it = G.non_terminals.find( str[0] );

        if (it != G.non_terminals.end()) {
            cout << "symbol " << str[0] << " uje neterminal..." << endl;
            continue;
        }

        G.terminals.insert(str[0]);

    }
    

    cout << "Vvedite Startovi symbol" << endl;

    while(1) {
        getline(cin, str);

        if (str.length() != 1) {
            cout << "Odin symbol" << endl;
            continue;
        }
        
        
        auto it = G.non_terminals.find( str[0] );

        if (it == G.non_terminals.end()) {
            cout << "startovii symbol  doljen bit neterminalom, polucheno: " << str[0] << endl;
            continue;
        }

        G.start = str[0];
        break;
    }

    //Chtenie pravil
    cout << "Vvedite Pravila cherez Enter, v konce vvoda prosto Enter" << endl;

    while(1) {
        getline(cin, str);

        size_t idx = str.find(delim);

        if (str.empty()) {
            break;
        }

        if (idx == string::npos) {
            cout << "ne pravilo" << endl;
            continue;
        }

        
        //remove delimeter
        str.erase(idx, delim.length());

        for (size_t i = 0; i < str.length(); i++) {
            auto it1 = G.terminals.find( str[i] );
            auto it2 = G.non_terminals.find( str[i] );

            if (it1 == G.terminals.end() 
                && it2 == G.non_terminals.end()
                && str[i] != eps) {
                    cout << "net symbola " << str[i] << " v grammatike" << endl;
                    continue;
                }
        }

        //index s kotorogo pravaya chast
        G.rules.push_back( make_pair(str, idx) );
    }


    if (isCFG(G)) {
        cout << "Kontektsno-svobodnaya" << endl;
    } else {
        cout << "drugaya" << endl;
        return 0;
    }

    if (exist(G)) {
        cout << "yazik suschestvuet" << endl;

    } else {
        cout << "ne suschestvuet" << endl;
    }


    return 0;


}