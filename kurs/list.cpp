
#include <iostream>

using namespace std;


template<typename T> class Node {
    public:
        T value;
        Node *next;
        Node *prev;
        Node(T value) : value(value) {}
};


template<typename T> class List {
    private:
        Node<T> *m_front = NULL;
        Node<T> *m_back = NULL;
        size_t length;

    public:
        List() {}
        bool isEmpty() const {
            return !(this->head == NULL);
        }
        size_t size() const {
            return this->length;
        }
        T front() const {
            return this->m_front->value;
        }
        T back() const {
            return this->m_back->value;
        }

        void insert(size_t index , T value) {

            //onempty
            if (this->m_front == NULL) {
                this->m_front = this->m_back = new Node<T>(value);
                this->length = 1;
                return;
            }
            //list contains single elem
            if (this->m_front == this->m_back) {

                if (index == 0) this->m_front = new Node<T>(value); //insert as first
                else this->m_back = new Node<T>(value); // insert as last

                this->m_front->next = this->m_front->prev = this->m_back;
                this->m_back->next = this->m_back->prev = this->m_front;

                this->length = 2;
                return;
            }
 
            //as first
            if (index == 0) {
                Node<T> *ptr = this->m_front;
                this->m_front = new Node<T>(value);
                this->m_front->next = ptr;
                this->m_front->prev = this->m_back;
                ptr->prev = this->m_front;
                this->m_back->next = this->m_front;
            } 
            //as last
            else if(index >= this->length) {
                Node<T> *ptr = this->m_back;
                this->m_back = new Node<T>(value);
                this->m_back->prev = ptr;
                this->m_back->next = this->m_front;
                ptr->next = this->m_back;
                this->m_front->prev = this->m_back;
            }
            //between first&last
            else {
                Node<T> *index_ptr = this->m_front;
                while(index-- > 0) index_ptr = index_ptr->next;
                Node<T> *prev_ptr = index_ptr->prev;
                Node<T> *new_ptr = new Node<T>(value);
                index_ptr->prev = prev_ptr->next = new_ptr;
                new_ptr->next = index_ptr;
                new_ptr->prev = prev_ptr;
            }

            this->length++;
        }
        void push_front(T value) {
            this->insert(0, value);
        }
        void push_back(T value) {
            this->insert(this->size(), value);
        }
        void remove(size_t index) {
            if (index >= this->length) throw "out of range";

        }
        /*void pop_back() {
            Node<T> *ptr = this->m_back;
            delete this->m_back;
            this->m_back 
        }*/
};
        /*void push_front(T);
        void push_back(T);
        void pop_front();
        void pop_back(); */   


int f() {
    return(1==1)?1:2;
}

int main() {
    /*List<int> a;
    a.insert(0, 2);
    a.insert(0, 3);
    a.insert(0, 4);
    a.insert(0, 5);
    a.insert(0, 6);
    a.insert(0, 7);
    a.insert(0, 8);

    a.insert(8, 1488);

    //cout << a.size();
    a.print();*/

    cout << f();

    return 0;
}