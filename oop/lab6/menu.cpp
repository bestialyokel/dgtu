#include <vector>
#include <iostream>
#include <functional>
#include <string>

#include "list.cpp"
#include "queue.cpp"

using namespace std;

class Menu {
    protected:
        vector<string> names;
        int addName(string name) {
            names.insert(names.end() - 1, name); // insert before Last (quit);
            return names.size() - 2;
        }
        Menu() {
            names.push_back("Quit");
        }
        virtual void processMenuItem(size_t itemIndex) = 0;
        void showMenu() {
            cout << endl;
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

class ListMenu /*QueueMenu*/ : protected Menu {
    List list;
    vector< std::function<void(void)> > actions;

    public:
        ListMenu() {
            Menu::addName("print");
            Menu::addName("inser");
            Menu::addName("remove");
            Menu::addName("get");

            actions.push_back([this]() -> void {
                //print
                cout << "print" << endl;
            });
            actions.push_back([this]() -> void {
                //insert
                cout << "insert" << endl;
            });
            actions.push_back([this]() -> void {
                //remove
                cout << "remove" << endl;
            });
            actions.push_back([this]() -> void {
                //get
                cout << "get" << endl;
            });

            Menu::showMenu();
        }
        void processMenuItem(size_t itemIndex) override {
            actions[itemIndex]();
        }
};


int main() {
    ListMenu a;

}