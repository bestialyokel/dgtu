//ASCII
const fs = require('fs');

let chr = (charcode) => String.fromCharCode(charcode);
let ord = (char) => char.charCodeAt(0);



let data = fs.readFileSync("input");

fs.writeFileSync("output", ord(data[1]));

console.log(ord(data[1]));
