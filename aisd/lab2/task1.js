const fs = require('fs');
const EOL = require('os').EOL;

function randomArray() {
let array = [];
let amount = Math.round(Math.random() * 20)
for (let i = 0; i < amount; i++) {
array.push(Math.round(Math.random() * 20 - 10));
}
return array;
}

class lab2 {
  constructor(path) {
    this.path = path
    this.size = fs.statSync(this.path).size;
  }
  createFile() {
    fs.writeFileSync(this.path, randomArray());
    this.createFile = () => {};
    this.size = fs.statSync(this.path).size;
  }
  negAmount() {
    const file = fs.openSync(this.path,'r');
    let amount = 0;
    for(let i = 0; i < this.size - 2; i++) {
      const b = Buffer.alloc(1);
      fs.readSync(file, b, 0, 1, i, () => {});
      if (String(b) == "-") {amount++}
    }
   console.log(amount);
  }
  putChar(pos, char) {
   const file = fs.openSync(this.path,'r+');
   fs.writeSync(file, char, pos);
  }

  getLine(num) {
    const file = fs.openSync(this.path,'r');
    let str = "";
    for (let i = 0; i < this.size; i++) {
     	const b = Buffer.alloc(1);
      fs.readSync(file, b, 0, 1, i, () => {});
      str += String(b);
      if ((num > 1) && str.includes(EOL)) {str = ""; num--}
      if ((num == 1) && str.includes(EOL)) {str = str.replace(EOL, ""); i = this.size;}
    }
   str = (num <= 1) ? str : "nety";
   console.log(str);
  }
  getMatches(ex) {
    const file = fs.openSync(this.path,'r');
    let matches = [];
    let stroka = 1;
    let str = "";
    let smes = 0;
    for (let i = 0; i < this.size; i++) {
      const b = Buffer.alloc(1);
      fs.readSync(file, b, 0, 1, i, () => {});
      str += String(b);
      if (str.includes(ex)) {
        matches.push({stroka: stroka, pos: str.indexOf(ex) + smes});
        smes += str.length - 1; //str.indexOf(ex);
        str = "";
      }
      if (str.includes(EOL)) {
        smes = 0;
        str = "";
        stroka++;
      }
    }
   console.log(matches);
  }
  uniqueWords() {
    const file = fs.openSync(this.path,'r');
    let razd = /[,./_]/
    let words = [];
    let str = "";
    for (let i = 0; i < this.size; i++) {
	    const b = Buffer.alloc(1);
      fs.readSync(file, b, 0, 1, i, () => {});
      str += String(b);
      if (str.includes(EOL) || (i > this.size - 2)) {
        str = str.replace(EOL, "");
        str.split(razd).forEach((str_ex) => {
          let match = words.find(ex => {return ex.word == str_ex});
          if (match) {words[words.indexOf(match)].count += 1}
          else {words.push({word: str_ex, count: 1})}
        });
        str = "";
      }
    }
   console.log(words);
  }
}

let b = new lab2("task122.txt");
b.createFile();
b.negAmount();
b.getMatches("-");
