const {List} = require('./list.js');
const rl = require('readline-sync');

class TextUI {
  constructor() {
    this.list = new List()
    this.current = this.list;
    let answer;
    console.clear();
    while (answer != "5") {
      (this.current == this.list) ? console.log("simple") : console.log("arr");
      answer = rl.question('1 - switch\n2 - add to end\n3 - add to pos.\n4 - get list\n5 - exit\n\n');
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
          this.current.add(value);
          console.clear();
        break;
        case "3":
          console.clear();
          let line = rl.question('value?\n');
          let pos = rl.question('pos?\n');
          this.current.add(value,pos);
          console.clear();
        break;
        case "4":
          console.clear();
          console.log('-'.repeat(30));
          this.current.list.forEach(ex => console.log(ex));
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
