const Sort = require('./sort.js').Sort;
const process = require('process')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const randomArray = amount => [...Array(amount)].map(x => Math.round(Math.random() * 10000) );

const percentSortedArray = (amount,sortedCoeff) => {           //(0,1)
    let array = randomArray(amount)
    let index = Math.ceil(array.length*sortedCoeff)
    let sortedPart = array.slice(-index);
    array = array.slice(0, array.length - index)
    sortedPart = Sort.quick(sortedPart,false).array;
    return array.concat(sortedPart)
}

let array1 = randomArray(20);
let array2 = randomArray(500);
let array3 = randomArray(1000);
let array4 = randomArray(5000);
let array5 = randomArray(10000);

let arrays = [array1,array2,array3,array4,array5];

let sortedArrays = [];

sortedArrays.push(percentSortedArray(1000, 0.2));
sortedArrays.push(percentSortedArray(1000, 0.35));
sortedArrays.push(percentSortedArray(1000, 0.4));
sortedArrays.push(percentSortedArray(1000, 0.45));
sortedArrays.push(percentSortedArray(1000, 0.5));




//inclusion,bubble,quick,swap

let result = {
              inclusion: arrays.map(array=>Sort.inclusion(array,true)),
	            swap:      arrays.map(array=>Sort.swap(array,true)),
	            bubble:    arrays.map(array=>Sort.bubble(array,true)),
	            quick:     arrays.map(array=>Sort.quick(array,true))
	           }

console.log('\033c');
console.log('1 - inclusion');
console.log('2 - swap');
console.log('3 - bubble');
console.log('4 - quick');
console.log('5 - ret');

rl.on('line', line=> {
        console.log('\033c');
        console.log('1 - inclusion');
	console.log('2 - swap');
	console.log('3 - bubble');
	console.log('4 - quick');
	console.log('5 - ret','\n\n\n');

	switch(line) {
		case '1':
                        console.log('inclusion');
			console.log(result.inclusion.map(x=>x.info));
		break;
		case '2':
			console.log('swap');
			console.log(result.swap.map(x=>x.info));
		break;
		case '3':
			console.log('bubble');
			console.log(result.bubble.map(x=>x.info));
		break;
                case '4':
			console.log('quick');
			console.log(result.quick.map(x=>x.info));
		break;
		case '5':
			console.log('\033c');
			rl.close()
                break;
 	}
})
