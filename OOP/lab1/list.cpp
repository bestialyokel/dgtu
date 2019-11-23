#include <iostream>
#include <string>


using namespace std;

bool cmp(string, string);

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
    Node *tail;
    void add(int code, string name) {
        if (this->head == NULL) {
            this->head = new Node(code, name);
            this->tail = this->head;
            return;
        }

        Node *p = this->head;
        Node *z = NULL;

        while(p != NULL && cmp(name, p->name)) {
            z = p;
            p = p->next;
        }

        Node *q = new Node(code, name);
        if (p == this->head) {
            q->next = this->head;
            this->head = q;
        } else if (p == NULL) {
            this->tail->next = q;
            this->tail = q;
        } else {
            Node *v = z->next;
            q->next = v;
            z->next = q;
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



bool cmp(string a, string b) {
    for(int i = 0; i < a.size(); i++) a[i] = tolower(a[i]);
    for(int i = 0; i < b.size(); i++) b[i] = tolower(b[i]);

    string least = a.size() > b.size() ? b : a;

    for(int i = 0; i < least.size(); i++) {
        if (a[i] == b[i]) continue;
        if (a[i] > b[i]) return true;
        else return false;
    }
    return true;
}


int main() {
    Sorted_List *a = new Sorted_List;

    Menu b(a);

    return 0;
}
