#include "./list.cpp"


#ifndef QUEUE_AGGR
#define QUEUE_AGR

class Queue {
    private:
        List list;
    public:
        int getHead() const {
            return list.getItem(list.size() - 1);
        }
        void removeHead() {
            list.remove(list.size() - 1));
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
}

#endif