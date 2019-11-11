#include <iostream>
#include <string>

using namespace std;


struct Color {
    int code;
    string name;
    Color(int code, string name) {
        this->code = code;
        this->name = name;
    }
};

template<typename T> struct Node {
    Node *next;
    T *value;
    Node<T>() {
        this->value = NULL;
        this->next = NULL;
    }
    Node<T>(T *value, Node *next = NULL, Node *prev = NULL) {
        this->value = value;
        this->next = next;
    }
};


template<typename T> struct Sorted_List {
    Node<T> *head;
    void add(T *value) {
        Node<T> *newNode = new Node<T>(value);
        if (this->head == NULL) {
            this->head = new Node<T>(value);
            return;
        }
        Node<T> *p = this->head;
        while(value->name > p->value->name && p->next != NULL) {
            p = p->next;
        }
        if (p->next == NULL) p->next = newNode;
        else {
            Node<T> *q = p->next;
            p->next = newNode;
            newNode->next = q;
        }
    }
};

struct Menu {
    Sorted_List<Color> *item;
    Menu(Sorted_List<Color> *item) {
        this->item = item;
        this->init();
    }
    void print() {
        Node<Color> *p = this->item->head;
        while(p != NULL) {
            cout << p->value->name << "  " << p->value->code << endl;
            p = p->next;
        }
    }
    void add() {
        string name;
        int code;
        cout << "Введите имя" << endl;
        cin >> name;
        cout << "введите код" << endl;
        cin >> code;
        this->item->add(new Color(code, name));
        cout << "\033c";
    }
    void init() {
        cout << "1 - Добавить в список" << endl
             << "2 - вывести список" << endl;
             switch(cin.get()) {
                case 49:
                    this->add();
                    this->init();
                    break;
                case 50:
                    this->print();
                    this->init();
                    break;
                default:
                    cout << "\033c" << "test";
                    this->init();
                    break;

             }
    }
};

int main() {
    Sorted_List<Color> *a = new Sorted_List<Color>();
    Menu b(a);
    return 0;
}