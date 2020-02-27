const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)

let minIndex = (A) => {
    let index = 0
    for (let i = 0; i < A.length; i++) if (A[i] < A[index]) 
        index = i
    return index
}

const cpus = 5
const tasks = 3
const t1 = 5
const t2 = 30

let load = Array(tasks).fill(0)

let matrix = Array(cpus).fill().map(
    line => Array(tasks).fill().map(x => randomInt(t1, t2))
)

let sum = (A) => A.reduce((acc, cur) => acc + cur)

console.log("VOZRAsT")

matrix.sort(
    (a,b) => sum(b) - sum(a)
)

matrix.forEach(
    line => {
        let i = minIndex(line)
        load[i] += line[i]
    }
)

let maxMinElem = Math.max(...load)

console.log(matrix, load, maxMinElem)

console.log("UB")

load.fill(0)

matrix.sort(
    (a,b) => sum(a) - sum(b)
)

matrix.forEach(
    line => {
        let i = minIndex(line)
        load[i] += line[i]
    }
)

maxMinElem = Math.max(...load)

// matrix.map(x=>sum(x))
console.log(matrix, load, maxMinElem)
