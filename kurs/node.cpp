
#ifndef NODE
#define NODE

template<typename T> class Node {
    public:
        T value;
        Node *next;
        Node *prev;
        Node(T value) : value(value) {}
        Node(Node<T> *node) {
            this = node;
        }
        ~Node() {}
};

#endif