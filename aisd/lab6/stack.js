class Stack {
  constructor() {
    this.head = null;
  }
  add(value) {
    if (!this.head) {
      this.head = {value: value, next: null};
      return;
    }
    let b = this.head;
    this.head = {value: value, next: b}
  }
  getStack() {
    let a = this.head;
    let stack = [];
    while (a !== null) {
      stack.push(a.value)
      a = a.next;
    }
    return stack
  }
  removeHead() {
    if (!this.head) {return}
    this.head = this.head.next
  }
  getTop() {
    let a = this.head;
    if (!a) {return null}
    while (a.next !== null) {
      a = a.next;
    }
    return a.value
  }
}

class StackArr {
  constructor(size) {
    this.MAX_SIZE = size;
    this.stack = [];
  }
  add(value = null) {
    if (this.stack.length >= this.MAX_SIZE) {return}
    this.stack.push(value)
  }
  removeHead() {
    if (this.stack.length == 0) {return}
    this.stack.shift();
  }
  getStack() {
    return this.stack;
  }
  getTop() {
    return this.stack[this.stack.length - 1]
  }
}

module.exports = {Stack, StackArr}
