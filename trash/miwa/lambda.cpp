
#include <iostream>
#include <fstream>
#include <string>
#include <iosfwd>
#include <sstream>
#include <regex>
#include <vector>

using namespace std;


/*
http://www.martinbroadhurst.com/how-to-split-a-string-in-c.html
*/
template <class Container>
void split3(const std::string& str, Container& cont,
              char delim = ' ')
{
    std::size_t current, previous = 0;
    current = str.find(delim);
    while (current != std::string::npos) {
        cont.push_back(str.substr(previous, current - previous));
        previous = current + 1;
        current = str.find(delim, previous);
    }
    cont.push_back(str.substr(previous, current - previous));
}

#define EOL '\n'
#define splitSymbol ','

class Table {
    public:
        string title;
        vector<string> fields;
        vector< vector<string> > rows;

    Table() = delete;
    Table(const string &data) {
        stringstream dataStream(data);
        
        getline(dataStream, title, EOL);

        string tmp;
        getline(dataStream, tmp, EOL);
        split3< vector<string> >(tmp, fields, splitSymbol);

        size_t current = 0;
        while(getline(dataStream, tmp, EOL)) {
            rows.push_back(vector<string>());
            split3< vector<string> >(tmp, rows[current], splitSymbol);

            //на всякий дополню чтобы не вылетало из-за кривого файла.
            while(rows[current].size() < fields.size())
                rows[current].push_back( string() );
            current++;
        }
    }
};

class MyDB {
    public:
        vector<string> tableFiles;
        vector<Table> tables;

        MyDB(vector<string> tableFiles) : tableFiles(tableFiles) {}

        ~MyDB() {
            save();
        }

        bool connect() {
            ifstream is;
            string buffer;
            for (auto &fname : tableFiles) {
                is.open(fname);
                if (!is.is_open())
                    throw "hz";
                std::copy(
                    istreambuf_iterator<char>(is),
                    istreambuf_iterator<char>(),
                    back_inserter(buffer)
                );
                tables.push_back(Table(buffer));
                is.clear();
                is.close();
            }
        }
    private:
        void save() {
            ofstream os;
            for (int i = 0; i < tables.size(); ++i) {
                os.open(tableFiles[i], ios::trunc);
                if (!os.is_open())
                    throw "hz";

                os << tables[i].title << EOL;

                for (int j = 0; j < tables[i].fields.size() - 1; ++j) {
                    os << tables[i].fields[j] << splitSymbol;
                }
                os << tables[i].fields[tables[i].fields.size() - 1] << EOL;
                
                for (auto &row: tables[i].rows) {
                    for (int n = 0; n < row.size() - 1; ++n) {
                        os << row[n] << splitSymbol;
                    }
                    os << row[row.size() - 1] << EOL;
                }

                //os << tables[i].rows[tables[i].rows.size() - 1][] << EOL;
                //os << tables[i].rows[j][m] << splitSymbol;

                /*for (auto &row : tables[i].rows) {
                    for (int j = 0; j < row.size(); ++j) {
                        os << row[j] << splitSymbol;
                    }
                    os << EOL;
                }*/


                os.clear();
                os.close();
            }
        }        
};

class Menu {
    public:
        vector<string> names;
        int addName(string name) {
            names.insert(names.end() - 1, name); // insert before Last (quit);
            return names.size() - 2;
        }
        Menu() {
            names.push_back("Конец");
        }
        virtual void processMenuItem(size_t itemIndex) = 0;
        void showMenu() {
            int counter = 0;
            for (auto &item : names) {
                cout << endl << counter << " - " << item;
                counter++;
            }
            int choice;
            cin >> choice;
            if (choice < names.size() - 1) processMenuItem(choice);
            if (choice == names.size() - 1) return; //Quit
            else showMenu();
        }   
};



class TableView : public Menu {
    vector< std::function<void(void)> > actions;
    public:
        TableView() = delete;
        TableView(Table &table) {
            Menu::addName("Добавить запись");
            Menu::addName("Найти по атрибуту");
            Menu::addName("Отобразить");
            Menu::addName("Удалить запись");


            actions.push_back([&table]() -> void {
                vector<string> values;
                string tmp;
                for (auto &field : table.fields) {
                    cout << field << " = ";
                    cin >> tmp;
                    values.push_back(tmp);
                }
                table.rows.push_back(values);
            });
            
            actions.push_back([&table]() -> void {
                size_t current = 0;
                string tmp;
                cout << std::endl;
                for (auto &field : table.fields) {
                    cout << current << " - " << field << std::endl;
                    current++;
                }
                cout << "Атрибут?" << std::endl;
                cin >> current;
                cout << "Значение?" << std::endl;
                cin >> tmp;
                for (auto &row : table.rows) {
                    if (row[current] == tmp) {
                        for (int i = 0; i < row.size() - 1; ++i) {
                            cout << row[i] << splitSymbol;
                        }
                        cout << row[row.size() -1] << std::endl;
                    }
                }
            });
            actions.push_back([&table]() -> void {
                cout << "    ";
                for (int i = 0; i < table.fields.size() - 1; ++i) {
                    cout << table.fields[i] << '|';
                }
                cout << table.fields[table.fields.size() - 1] << std::endl;

                size_t counter = 0;
                for (auto &row : table.rows) {
                    cout << counter++ << " > ";
                    for (int i = 0; i < row.size() - 1; ++i) {
                        cout << row[i] << '|';
                    }
                    cout << row[row.size() -1] << std::endl;
                }
            });

            actions.push_back([&table]() -> void {
                cout << "    ";
                for (int i = 0; i < table.fields.size() - 1; ++i) {
                    cout << table.fields[i] << '|';
                }
                cout << table.fields[table.fields.size() - 1] << std::endl;

                size_t counter = 0;
                for (auto &row : table.rows) {
                    cout << counter++ << " > ";
                    for (int i = 0; i < row.size() - 1; ++i) {
                        cout << row[i] << '|';
                    }
                    cout << row[row.size() -1] << std::endl;
                }
                cout << "Индекс удаляемого" << std::endl;
                cin >> counter;
                if (counter > table.rows.size())
                    throw "out of range";
                table.rows.erase(table.rows.begin() + counter);
            });


        }
        void processMenuItem(size_t itemIndex) override {
            try {
                actions[itemIndex]();
            } catch(const exception &e) {
                cout << e.what();
                Menu::showMenu();
            }
        }
};


int main(void) {
    vector<string> files {"./animal.txt"};
    MyDB db(files);

    try {
        db.connect();
    } catch(const exception &e) {
        cout << e.what() << std::endl;
        return 0;
    }

    TableView x(db.tables[0]);
    x.showMenu();


}