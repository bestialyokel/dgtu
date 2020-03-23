const { word } = require('./deps')


/*

^  ---> ^+ (без eps)

eps + 0^ + 2^ + (1 + 2^1 + 0^1)* + (1 + 12^ + 10^)*

word лучше дополнить методом next() для упрощения

*/

function* plus(alphabet, limit = 0) {
    let i = 1;
    if (limit == 0) 
        while(1) yield word(alphabet, i++)
    else 
        while(limit-- > 0) yield word(alphabet, i++)
    
}

function* eps() {
    yield "eps"
}

function* myreg(limit = 0) {
    let generators = [
        eps(),
        plus(["0"]),
        plus(["2"]),
        plus(["1", "21", "01"]),
        plus(["1", "12", "10"])
    ]

    while (generators.length > 0) {
        for (let i = 0; i < generators.length; i++) {
            if (limit-- <= 0) return
            const {value, done} = generators[i].next()
            if (done) {
                generators.splice(i,1)
                continue
            }
            yield value
            
        }
    }
}


let x = myreg(32)

console.log([...x])