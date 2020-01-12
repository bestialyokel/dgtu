
#include "./node.cpp"



#ifndef MNW
#define MNW

template<typename T> class MyNodeWrapper {
    //friend class List<T>;
    private:
        Node<T> *node = 0;
    public: 
        MyNodeWrapper(Node<T> *node) : node(node) {}
        T *operator*() {
            return node->value;
        }
        MyNodeWrapper<T> operator++() {
            return MyNodeWrapper(node->next);
        }
        MyNodeWrapper<T> operator--() {
            return MyNodeWrapper(node->prev);
        }
};

#endif