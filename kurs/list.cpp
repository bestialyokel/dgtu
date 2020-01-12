#include "./node.cpp"
#include "./mynodewrapper.cpp"

#include <cstddef>
//#include <iostream>

#ifndef LIST
#define LIST

template<typename T> class List {
    private:
        Node<T> *m_front = NULL;
        Node<T> *m_back = NULL;
        size_t length = 0;

        void m_remove(Node<T> *node) {
            
            if (node == this->m_front) this->m_front = node->next;
            if (node == this->m_back) this->m_back = node->prev;
            if (node->prev != NULL) node->prev->next = node->next;
            if (node->next != NULL) node->next->prev = node->prev;
            delete node;
        }

    public:
        List() {}
        ~List() {
            Node<T> *ptr;
            while (this->m_front != NULL) {
                ptr = this->m_front;
                this->m_front = this->m_front->next;
                delete ptr;
            }
        }

        MyNodeWrapper begin() {
            return MyNodeWrapper(this->m_front);
        }
        MyNodeWrapper end() {
            return MyNodeWrappe(this->m_back);
        }

        void remove(MyNodeWrapper<T> wrappedNode) {
            this->remove(wrappedNode->node);
        }

        size_t size() const {
            return this->length;
        }
        void insert(size_t index , T value) {
            
            this->length += 1;
            //empty
            if (this->m_front == NULL) {
                this->m_front = this->m_back = new Node<T>(value);
                return;
            }
            //list contains single elem
            if (this->m_front == this->m_back) {

                if (index == 0) this->m_front = new Node<T>(value); //insert as first
                else this->m_back = new Node<T>(value); // insert as last

                this->m_front->next = this->m_front->prev = this->m_back;
                this->m_back->next = this->m_back->prev = this->m_front;

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
            else if(index >= this->length-1) {
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
        }
        
        inline void push_back(T value) {
            this->insert(this->size(), value);
        }
        /*inline void push_front(T value) {
            this->insert(0, value);
        }*/
        /*
        void remove(size_t index) {
            if (index >= this->length) throw "out of range";
            
            Node<T> *node = this->m_front;
            while (index-- > 0) node = node->next;
            this->m_remove(node);

        }
        void remove();
        */


        /*
        void print() {

            std::cout << this->m_front->value << std::endl;

            if (this->m_front == this->m_back) return;

            Node<T> *p = this->m_front->next;
            
            while (p != this->m_front) {
                std::cout << p->value << std::endl;
                p = p->next;
            }
        }
        */
        /*bool isEmpty() const {
            return !(this->m_front == NULL);
        }*/
        /*T front() const {
            return this->m_front->value;
        }
        T back() const {
            return this->m_back->value;
        }*/
};
      
#endif
