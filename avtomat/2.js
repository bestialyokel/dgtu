const { word } = require('./deps')


/*

^  ---> ^+ (whithout E)

eps + 0^ + 2^ + (1 + 2^1 + 0^1)* + (1 + 12^ + 10^)*

можно сделать класс регулярных выражений и типа он будет роходить и сдвигать каждую конструкцию-генератор через next()



*/


function* myreg(amount) {
    let counter = amount
    let result = ["eps", "0", "2"]
    counter -= 3;
    for (let i = 0; i < counter; i++) result.push(word(["1", "01", "21"], i+1))
    while(result.length > 0) yield result.shift()
}

let x = myreg(32)

console.log(...x)