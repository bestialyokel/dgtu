
#ifndef LIST_H
#define LIST_H

template<typename T> class List {
    private:
        Node<T> *m_front = NULL;
        Node<T> *m_back = NULL;
        size_t length;

    public:
        List() {}
        ~List() {}
        bool isEmpty() const;
        size_t size() const;
        T front() const;
        T back() const;
        void insert(size_t index, T value);
        void push_front(T value);
        void push_back(T value);
        void remove(size_t index);
        void pop_front();
        void pop_back();
};

#include "./list.cpp"

#endif