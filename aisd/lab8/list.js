
class List {
  constructor() {
    this.head = null;
  }
  set list(arg) {
  }

  get list() {
    let list = [];
    let a = this.head;
    while (a != null) {
      list.push(a.value)
      a = a.next;
    }
    return list;
  }
  isEmpty() {
    return (this.head == null);
  }
  add(value, position = -1) {
    if (this.isEmpty()) {
      this.head = {value: value, next: null};
      return
    }
    let a = this.head
    
    switch(position) {
      case -1:
        while (a.next != null) {
          a = a.next;
        }
        a.next = {value: value, next: null}
      break;
    //-------------------------------------------
      case 0:
        this.head = {value: value, next: this.head}
      break;
    //-------------------------------------------
      default:
        while (position > 2 && a.next != null) {
          position--;
          a = a.next;
        }
        if (a.next == null) {
          a.next = {value: value, next: null}
        } else {
          let c = a.next;
          a.next = {value: value, next: c}
        }
      break
    }
  }
}


let b = new List();
b.add(1); b.add(2); b.add(3); b.add(4); b.add(5);

module.exports = {List}
  