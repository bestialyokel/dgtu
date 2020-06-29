
const terminals = ['a', 'b']

const non_terminals = ['S', 'A']

//["индекс, начиная с которого правая часть", left,right]
const rules = [
    [1, 'S', 'A', 'c', 'A', 'c', 'A'],
    [1, 'A', 'a', 'A'],
    [1, 'A',' b', 'A'],
    [1, 'A', 'A', 'a'],
    [1, 'A', 'A', 'b'],
    [1, 'A', 'b'],
    [1, 'A', 'a'],
]

//типа праволинейная сначала
let type = 3

for (let i = 0; i < rules.length; i++) {
    const ruleLine = rules[i]
    if (type == 3) {

        if (ruleLine.length > 4) {
            type = 2
        }

        if (ruleLine[0] != 1) {
            type = 1
        }

        if (ruleLine[0] > ruleLine.length - 1) {
            type = 0
        }
         
    } else if (type == 2) {

        if (ruleLine[0] != 1) {
            type = 1
        }

    } else if (type == 1) {
        
        if (ruleLine[0] > ruleLine.length - 1) {
            type = 0
        }

    } else if (type == 0) {
        console.log(0)
        break;
    }
}

console.log(type)