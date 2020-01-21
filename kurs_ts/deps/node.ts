

export default class Node<T> {
    public value: T
    public next: Node<T>
    public prev: Node<T>
    constructor(value) {
        this.value = value
        this.next = null
        this.prev = null
    }
}