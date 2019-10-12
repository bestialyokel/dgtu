const readline = require('readline');

const Search = require('./search.js').Search;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


const randomArray = amount => [...Array(amount)].map(x => Math.round(Math.random() * 10000) );

const percentSortedArray = (amount,sortedCoeff) => {      //(0,1)
  let array = randomArray(amount)
  let index = Math.ceil(array.length*sortedCoeff)
  let sortedPart = array.slice(-index);
  array = array.slice(0, array.length - index)
  const sortRule = (a,b) => {
    if(a<b) return -1
    else if(a>b) return 1
    else return 0
  }
  sortedPart = sortedPart.sort(sortRule)
  return array.concat(sortedPart)
}

