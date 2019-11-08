template<typename T> struct Node {
    Node<T> next;
    Node<T> prev;
    T value;
    Node(T value, Node &next = NULL, Node &prev = NULL) {
        this->value = value;
        this->next = next;
        this->prev = prev;
    }
};