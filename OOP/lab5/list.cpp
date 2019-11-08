#include <iostream>
#include "nodes/d_node.cpp"
using namespace std;

template<typename T>class List {
    private:
        Node<T> head;
    public:
        List() {}
        size_t length;
        void insert(size_t index, T value) {
            this->head = new Node<T>(value);
            //while (index > 0 && (this->head.next != NULL))
        }
        void remove(size_t index = 0) {}
        bool isEmpty() {
            return (this->Head == NULL);
        }
        void print() {
            Node<T> ptr = head;
            while (ptr != NULL) {
                cout << ptr.value << endl;
                ptr = ptr.next;
            }
        }
};

int main() {
    List<int> a();
    a.print();
    return 0;
}