import Node from "./node"


class IamClown<T> {
    //friend class not supported..................
    public node_please_dont_read_this_field : Node<T>
    //перегрузку не завезли...
    public "++" = () => new IamClown<T>(this.node_please_dont_read_this_field.next)
    public "--" = () => new IamClown<T>(this.node_please_dont_read_this_field.prev)
    public equalTo = (it: IamClown<T>) => (this.node_please_dont_read_this_field == it.node_please_dont_read_this_field)
    public getValue = () => this.node_please_dont_read_this_field.value
    constructor(node: Node<T>)  {
        this.node_please_dont_read_this_field = node
    }

}

export default class List<T> {
    private front: Node<T>
    private back: Node<T>
    private length: number
    private _remove(node: Node<T>) : void {
        this.length -= 1
        if (node == this.front) this.front = node.next
        if (node == this.back) this.back = node.prev
        if (node.prev != null) node.prev.next = node.next
        if (node.next != null) node.next.prev = node.prev
    }
    constructor() {
        this.length = 0;
    }
    public size = () => this.length
    public insert(index: number, value: T) : void {
        this.length += 1

        //empty
        if (this.front == null) {
            this.front = this.back = new Node<T>(value)
            return
        }
        //single elem
        if (this.front == this.back) {
            if (index == 0) this.front = new Node<T>(value)
            else this.back = new Node<T>(value)
            this.front.next = this.front.prev = this.back
            this.back.next = this.back.prev = this.front
            return
        }
        //as first
        if (index == 0) {
            let node = this.front
            this.front = new Node<T>(value)
            this.front.next = node
            this.front.prev = this.back
            node.prev = this.front
            this.back.next = this.front
        }
        //as last
        else if (index >= this.length-1) {
            let node = this.back
            this.back = new Node<T>(value)
            this.back.prev = node
            this.back.next = this.front
            node.next = this.back
            this.front.prev = this.back
        }
        //between first&last
        else {
            let index_node = this.front
            while(index-- > 0) index_node = index_node.next
            let prev_node = index_node.prev
            let new_node = new Node<T>(value)
            index_node.prev = prev_node.next = new_node
            new_node.next = index_node
            new_node.prev = prev_node
        }
    }
    public begin = () => new IamClown<T>(this.front)
    public end = () => new IamClown<T>(this.back)
    public remove = (it: IamClown<T>) => this._remove(it.node_please_dont_read_this_field)
    public push_back = (value: T) => this.insert(this.size() , value)
    
    public print() {
        let node = this.front;
        console.log(node.value)
        node = node.next
        while (node != this.front) {
            console.log(node.value)
            node = node.next
        }
    }
}