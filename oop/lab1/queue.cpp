#include <stdio.h>
#include <iostream>

using namespace std;

template<typename T> struct Node {
    Node *next;
    Node *prev;
    T value;
    Node() {
        this->value = NULL;
        this->next = NULL;
        this->prev = NULL;
    }
    Node(T value, Node *next = NULL, Node *prev = NULL) {
        this->value = value;
        this->next = next;
        this->prev = prev;
    }
};

template<typename T> struct Queue {
    private:
        Node<T> *head;
        Node<T> *tail;
    public:
        T getHead() {
            return this->head->value;
        }
        void unshift(T value) {
            Node<T> *node = new Node<T>(value);
            if (this->tail == NULL) {
                this->tail = this->head = node;
            } else if (this->head == this->tail) {
                this->tail = node;
                this->head->prev = this->tail;
                this->tail->next = this->head;
            } else {
                node->next = this->tail;
                this->tail->prev = node;
                this->tail = node;
            }
        }
        void print() {
            Node<T> *node = this->tail;
            while(node) {
                cout << node->value << endl;
                node = node->next;
            }
        }
        void printT() {
            Node<T> *node = this->head;
            while(node) {
                cout << node->value << endl;
                node = node->prev;
            }
        }
        void removeHead() {
            if (this->head == NULL) return;
            if (this->head == this->tail) {
                this->head = this->tail = NULL;
                return;
            }
            Node<T> *node = this->head;
            this->head = this->head->prev;
            this->head->next = NULL;
            delete node;
        }

        Queue() {
            this->head = NULL;
            this->tail = NULL;
        }
};

int main() {
    Queue<uint> *q = new Queue<uint>();
    q->removeHead();
    q->removeHead();
    q->unshift(1);
    q->unshift(3);
    q->removeHead();
    q->removeHead();
    q->removeHead();
    q->removeHead();
    q->unshift(2);
    q->unshift(4);
    q->unshift(5);
    q->print();
    q->printT();
}