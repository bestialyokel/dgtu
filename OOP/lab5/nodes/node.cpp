template<typename T> struct Node {
    Node<T> next;
    T value;
    Node(T value, Node &next = NULL) {
        this->value = value;
        this->next = next;
    }
};