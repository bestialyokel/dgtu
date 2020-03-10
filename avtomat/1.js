const {word, number} = require('./deps')

var alphabet = ['а', 'б', 'в', 'г'];



var x = word(alphabet, 274)
var y = number(alphabet, 'гааб')

console.log(x,y);
