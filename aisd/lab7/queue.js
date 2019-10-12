
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  set queue(arg) {
    return
  }
  get queue() {
    let queue = [];
    let a = this.tail;
    while (a != null) {
      queue.push(a.value)
      a = a.next;
    }
    return queue;
  }
  isEmpty() {
    return (this.tail == null);
  }
  add(value = null) {
    if (this.isEmpty()) {
      this.head = {value: value, next: null};
      this.tail = this.head;
      return
    }
    this.tail = {value: value, next: this.tail};
  }
  removeHead() {
    if (this.isEmpty()) {return}
    if (this.head == this.tail) {this.head = this.tail = null; return}
    let a = this.tail;
    while (a.next != this.head && a.next != null) {
      a = a.next;
    }
    if (!a.next) {
      a = null;
      return
    }
    a.next = null;
    this.head = a;
  }
  getHead() {
    return (!this.head) ? null : this.head.value;
  }
}

class QueueArray {
  constructor() {
    this.queue = [];
  }
  add(value = null) {
    this.queue.unshift(value);
  }
  getHead() {
    let queue = this.queue
    return (queue.length | 0) ? queue[queue.length - 1] : null;
  }
  removeHead() {
    this.queue.pop()
  }
}

module.exports = {Queue, QueueArray}
