#include <iostream>


#define uint unsigned int
using namespace std;



struct Node {
    uint value;
    Node *Next = NULL;
    Node(int num) {
        this->value = num;
    }
};

struct Stack {
    Node *Head;
    Stack() {
        Head = new Node(0);
        Node *p = new Node(1);
        p->Next = Head;
        Head = p;
    }
    Stack(int amount) {
        Head = new Node(0); // push 0, 1 to stack
        Node *p = new Node(1);
        p->Next = Head;
        Head = p;
        while (amount > 2) {
            this->push();
            amount--;
        }
    }
    void push() {
        Node *p = new Node(Head->value + Head->Next->value);
        p->Next = Head;
        Head = p;
    }
    void printEven() {
        Node *p = Head;
        while(p) {
            if (p->value & 1) cout << p->value << endl;
            p = p->Next;
        }
    }
    void printOdd() {
        Node *p = Head;
        while(p) {
            if (!(p->value & 1)) cout << p->value << endl;
            p = p->Next;
        }
    }
    void print() {
        Node *p = Head;
        while(p) {
            cout << p->value << endl;
            p = p->Next;
        }
    }
};

int main() {
    const int amount = 20;
    Stack *s = new Stack(amount);
    s->printEven();
    cout << "------" << endl;
    s->printOdd();
    cout << "------" << endl;
}