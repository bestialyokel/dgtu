#include <iostream>
#include "./list.cpp"

class Stack {
    private:
        List list;
    public:
        void pop() {
            list.remove(0);
        }
        void push(int number) {
            list.insert(0, number);
        }
        int getTop() {
            return list.getItem(0);
        }
        bool isEmpty() {
            return list.size() == 0;
        }
        void print() {
            list.print();
        }
        int size() {
            return list.size();
        }
};
