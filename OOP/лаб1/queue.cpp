#include <iostream>
using namespace std;

struct Node {
    int value;
    Node *Next;
    Node *Prev;
    Node(int number) {
        this->value = number;
    }
};

struct Queue {
    Node *Head;
    Node *Tail;
    Queue() {};
    void unshift(int number) {
        Node *node = new Node(number);
        if (this->Tail == NULL) {
            this->Tail = this->Head = node;
            return;
        } else  {
            this->Tail->Prev = node;
            node->Next = this->Tail;
            this->Tail = node;
        }
    }
    void removeHead() {
        if (this->Head == NULL) return;
        delete this->Head->Prev->Next;
        this->Head->Prev->Next = NULL;
        this->Head = this->Head->Prev;
        
    }
    int getHead() {
        if (this->Head) return this->Head->value;
    }
    void print() {
        Node *node = this->Tail;
        while(node) {
            cout << node->value << endl;
            node = node->Next;
        }
    }
};

int main() {
    Queue *q = new Queue();
    q->unshift(1);
    q->unshift(2);
    q->unshift(3);
    q->unshift(4);
    q->removeHead();
    q->removeHead();
    q->unshift(5);
    q->print();
}