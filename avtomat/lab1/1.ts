
let alphabet : string[] = ['a','b','c']

let word = (alphabet: string[], index: number): string =>  {
    let acc: string = String()
    while (index > alphabet.length) {
        let odd: number = ( (index/alphabet.length) >> 0) * alphabet.length
        console.log(odd)
        acc += alphabet[index - odd]
        index = odd
    }
    return acc
}

let x = word(alphabet, 11)

console.log(x)

//без этого выадет ошибку redeclared ...
export{}