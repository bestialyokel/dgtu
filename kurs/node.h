
#ifndef NODE_H
#define NODE_H

template<typename T> class Node {
    public:
        T value;
        Node *next;
        Node *prev;
        Node(T value) : value(value) {}
};

#endif