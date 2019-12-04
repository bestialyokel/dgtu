#include <iostream>

using namespace std;

class List {
    private:

        class Node {
            public:
                int data;
                Node *next;
                Node *prev;
                Node(int value, Node *next = NULL, Node *prev = NULL) {
                    this->data = value;
                    this->next = next;
                    this->prev = prev;
                }
        };

    public:
        Node *head;
        Node *tail;
        uint length = 0;
        List() {}
        ~List() {
            Node *p;
            while (this->head != NULL) {
                p = this->head;
                this->head = this->head->next;
                delete p;
            }
        }
        uint size() {
            return this->length;
        }
        void insert(uint index, int value) {

            Node *newNode = new Node(value);
            this->length += 1;

            //пустой
            if (this->head == NULL) {
                this->head = this->tail = newNode;
                return;
            }
            // в начало
            if (index == 0) {
                newNode->next = this->head;
                this->head->prev = newNode;
                this->head = newNode;
                return;
            }
            //в конец
            if (index >= this->length - 1) {
                newNode->prev = this->tail;
                this->tail->next = newNode;
                this->tail = newNode;
                return;
            }

            Node *p = this->head;

            while (index-- > 0) 
                p = p->next; //index-=1;

            newNode->next = p;
            newNode->prev = p->prev;
            p->prev->next = newNode;
            if (p->next == NULL) p->prev = newNode;
            else p->next->prev = newNode;
        }
        void remove(uint index) {

            if (this->head == NULL) return;
            if (index >= this->length) throw "i>size";
            

            this->length -= 1;
            if (this->head == this->tail) {
                delete this->head;
                this->head = this->tail = NULL;
                return;
            }

            if (index == 0) {
                this->head = this->head->next;
                delete this->head->prev;
                this->head->prev = NULL;
                return;
            }

            if (index == this->length) {
                this->tail = this->tail->prev;
                delete this->tail->next;
                this->tail->next = NULL;
                return;
            }

            Node *p = this->head;
            while (index-- > 0)
                p = p->next;
            p->prev->next = p->next;
            p->next->prev = p->prev;
            delete p;
        }
        int getItem(uint index) const {
            if (index >= this->length) throw "i>size";
            Node *p = this->head;
            while (index-- > 0)
                p = p->next;
            return p->data; 
        }
        void print() {
            Node *p = this->head;
            while (p != NULL) {
                cout << p->data << endl;
                p = p->next;
            }
        }
};
