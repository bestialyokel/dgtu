#include <vector>
#include <iostream>
//#include <functional>
#include <string>

#include "list.cpp"
#include "queue.cpp"

using namespace std;

class Menu {
    protected:
        vector<string> names;
        int addName(string name) {
            names.insert(--names.end() - 1, name); // insert before Last (quit);
            return names.size() - 2;
        }
        Menu() {
            names.push_back("Quit");
        }
        virtual void processMenuItem(int itemIndex) = 0;
        void showMenu() {
            cout << "\033c";
            int counter = 0;
            for (auto &item : names) {
                cout << endl << counter << " - " << item;
                counter++;
            }
            uint choice;
            cin >> choice;
            if (choice < names.size() - 1) processMenuItem(choice);
            if (choice == names.size() - 1) return; //Quit
            else showMenu();
        }   
};

class ListMenu : protected Menu {
    List list;
    //надо создать текстовый интерфейс, но впадлу
    public:
        ListMenu() {
            addName("a");
            addName("a");
            addName("a");
        }


};

void a() {
    cout << 1;
}

int main() {


}