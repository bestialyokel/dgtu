
#include "./node.cpp"

#ifndef MNW
#define MNW

template<typename T> class MyNodeWrapper {
    friend class List;
    private:
        Node<T> *node = NULL;
    public: 
        MyNodeWrapper(Node<T> *node) : node(node) {}
        T *operator*() {
            return node->value;
        }
        MyNodeWrapper operator++() {
            return MyNodeWrapper(node->next);
        }
        MyNodeWrapper operator--() {
            return MyNodeWrapper(node->prev);
        }
}

#endif