const {Stack,StackArr} = require('./stack.js');
const rl = require('readline-sync');

class TextUI {
  constructor() {
    this.stack = new Stack();
    this.stackArr = new StackArr(10);
    this.current = this.stack;
    let answer;
    console.clear();
    while (answer != "6") {
      console.log('\n\n\n\n');
      (this.current == this.stack) ? console.log("simple") : console.log("arr");
      answer = rl.question('1 - switch\n2 - add\n3 - remove head\n4 - get stack\n5 - get top\n6 - exit\n\n');
      switch(answer) {
        case "1":
          console.clear();
          if (this.current == this.stack) {
            this.current = this.stackArr;
          } else {
            this.current = this.stack;
          }
        break;
        case "2":
          console.clear();
          let line = rl.question('value?\n');
          this.current.add(line);
          console.clear();
        break;
        case "3":
          this.current.removeHead();
        break;
        case "4":
          console.clear();
          console.log('-'.repeat(30));
          this.current.getStack().forEach(ex => console.log(ex));
          console.log('-'.repeat(30));
        break;
        case "5":
          console.clear();
          console.log(this.current.getTop());
        break;
        default:
          console.clear();
        break;
      }
      console.log('^'.repeat(35))
    }
  }
}

new TextUI();
