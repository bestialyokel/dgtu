#include <iostream>

#define uint unsigned int
using namespace std;

struct Node {
    uint value;
    Node *Next = NULL;
    Node *Prev = NULL;
    Node(uint number) {
        this->value = number;
    }
};

struct List {
    Node *Head;
    List() {};
    void push(uint number) {
        if (Head == NULL) {
            Head = new Node(number);
            return;
        }
        Node *p = Head;
        while (p->Next) {
            if (p->value == number) break;
            p = p->Next;   
        }
        if (p->value != number) {
            Node *q = new Node(number);
            q->Prev = p;
            p->Next = q;
        }
    }           
    void del(uint number) {
        Node *p = Head;
        if (Head->value == number) {
            Head = Head->Next;
            p = NULL;
            delete p;
            return;
        }
        while (p) {
            if (p->value == number) {
                p->Next->Prev = p->Prev;
                p->Prev->Next = p->Next;
                delete p;
                return;
            }
            p = p->Next;
        }
    }
    void print() {
        Node *node = Head;
        cout << "HEAD" << Head->value << endl;
        while(node) {
            cout << node->value << endl;
            node = node->Next;
        }
    }
};

int main() {
    List *s = new List();
    s->push(12);
    s->push(13);
    s->push(14);
    s->push(15);
    s->push(16);
    s->del(12);
    s->print();
}