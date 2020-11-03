#include "list.cpp"

class Queue {
    private:
        List list;
    public:
        int getHead() {
            int size = list.size();
            return list.getItem(list.size() - 1);
        }
        void removeHead() {
            list.remove(list.size() - 1);
        }
        void insertTail(int number) {
            list.insert(0, number);
        }
        bool isEmpty() {
            return list.size() == 0;
        }
        void print() {
            list.print();
        }
};

class Queue_I : private List {
    public:
        int getHead() {
            return this->getItem(this->size() - 1);
        }
        void removeHead() {
            this->remove(this->size() - 1);
        }
        void insertTail(int number) {
            this->insert(0, number);
        }
        bool isEmpty() {
            return this->size() == 0;
        }
        void print() {
            List::print();
        }
};
