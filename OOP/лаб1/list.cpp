#include <iostream>
#include <string>


using namespace std;

string lc(string a) {
    a = string(a);
    for (int i = 0; i < name1.size(); i++) name1[i] = tolower(name1[i]);
}

struct Node {
    Node *next;
    int code;
    string name;
    Node(int code, string name) {
        this->code = code;
        this->name = name;
    }
    
};

struct Sorted_List {
    Node *head;
    void add(int code, string name) {
        Node *newNode = new Node(code, name);
        if (this->head == NULL) {
            this->head = newNode;
            return;
        }
        Node *p = this->head;
        string name1 = lc(name);
        while(p->next != NULL) {
            string pname = lc(p->name);
            if (name1 < pname) break;
            p = p->next;
        }
        
    }
};

struct Menu {
    Sorted_List *item;
    Menu(Sorted_List *item) {
        this->item = item;
        this->init();
    }

    void print() {

        Node *p = this->item->head;
        cout << "-------------" << endl;
        while (p != NULL) {
            cout << p->code << " " << p->name << endl;
            p = p->next;
        }
        cout << "-------------" << endl;
    }
    void add() {
        string name;
        int code;
        cout << "Введите имя" << endl;
        cin >> name;
        cout << "введите код" << endl;
        cin >> code;
        this->item->add(code, name);
        cout << "\033c" << endl;
    }
    void init() {
        cout << "1 - Добавить в список" << endl
             << "2 - вывести список" << endl;
             string a;
             cin >> a;
             if (a == "1") {
                 this->add();
                 this->init();
             } else if (a == "2") {
                 this->print();
                 this->init();

             } else {
                cout << "\033c" << "net takoi" << endl;
                this->init();
             }
    }
};




int main() {
    Sorted_List *a = new Sorted_List;
    Menu m(a);
    return 0;
}