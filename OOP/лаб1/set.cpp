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
    Node *Head = NULL;
    uint size = 0;
    List() {};
    void push(uint number) {
        if (Head == NULL) {
            Head = new Node(number);
            size = 1;
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
            size++;
        }
    }           
    void del(uint number) {
        Node *p = Head;
        while(p) {
            if (p->value == number) break;
            p = p->Next;
        }
        if (p == NULL) return;

        if (p == Head) Head = Head->Next;
        else if (p->Next == NULL) p->Prev->Next = NULL;
        else {
            p->Prev->Next = p->Next;
            p->Next->Prev = p->Prev;
        }
        p = NULL;
        this->size--;
        delete p;
    }
    void print() {
        Node *node = Head;
        while(node) {
            cout << node->value << endl;
            node = node->Next;
        }
    }
};

struct Set {
    List *collection = new List();
    Set() {}
    uint getSize() {
        return this->collection->size;
    }
    void add(uint number) {
        this->collection->push(number);
    }
    void print() {
        this->collection->print();
    }
    
    bool has(uint number) {
        Node *p = this->collection->Head;
        while(p) {
            if (p->value == number) return true;
            p = p->Next;
        }
        return false;
    }
    void remove(uint number) {
        this->collection->del(number);
    }
    Set operator+(const Set second) {
        Set newSet;
        Node *p = this->collection->Head;
        Node *q = second.collection->Head;
        while(p) {
            newSet.add(p->value);
            p = p->Next;
        }
        while(q) {
            newSet.add(q->value);
            q = q->Next;
        }
    return newSet;
    }
    Set operator*(const Set &second) {
        Set newSet;
        Node *p = second.collection->Head;    
        while(p) {
            if (this->has(p->value) ) newSet.add(p->value);
            p = p->Next;
        }
        return newSet;
    }
};

int main() {
    Set a;
    Set b;

    a.add(1);
    a.add(2);
    b.add(525);
    b.add(2);
    b.add(4215326);
    b.add(1);
    a = a*b;
    a.print();
}