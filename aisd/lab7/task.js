const {Queue,QueueArray} = require('./queue.js');
const rl = require('readline-sync');

class TextUI {
  constructor() {
    this.que = new Queue();
    this.queArr = new QueueArray();
    this.current = this.que;
    let answer;
    console.clear();
    while (answer != "6") {
      (this.current == this.que) ? console.log("simple") : console.log("arr");
      answer = rl.question('1 - switch\n2 - add\n3 - remove head\n4 - get head\n5 - get queue\n6 - exit\n\n');
      switch(answer) {
        case "1":
          console.clear();
          if (this.current == this.que) {
            this.current = this.queArr;
          } else {
            this.current = this.que;
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
          console.log(this.current.getHead());
        break;
        case "5":
        console.clear();
        console.log('-'.repeat(30));
        this.current.queue.forEach(ex => console.log(ex));
        console.log('-'.repeat(30));
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
