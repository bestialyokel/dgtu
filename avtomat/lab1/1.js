
var alphabet = ['a', 'b', 'c'];
var word = function (alphabet, index) {
    var indexes = []
    var len = alphabet.length
    while (index > 0) {
        let i = 0
        if (index % len == 0) {
            i = index/len - 1
            console.log(i)
        } else {
            i = ((index/len) >> 0)
        }
        indexes.unshift(index - i)
        index = i
    }
    return indexes
};

var x = word(alphabet, 321);
console.log(x);
