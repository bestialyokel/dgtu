let word = (alphabet, index) => {
    let indexes = []
    let len = alphabet.length
    while (index > 0) {
        let i = 0
        if (index % len == 0) 
            i = index/len - 1
        else
            i = ((index/len) >> 0)

        indexes.unshift(index - i*len)
        index = i
    }
    return indexes.map(x => alphabet[x-1]).join('')
};

let number = (alphabet, word) => {
    word = Array.from(word).reverse()
    let result = 0;
    let grade = 1
    word.forEach(char => {
        result += grade * (alphabet.indexOf(char) + 1)
        grade *= alphabet.length
    })
    return result
}

module.exports = {number, word}