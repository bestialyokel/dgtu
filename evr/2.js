const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)

const cpus = 5
const tasks = 3
const t1 = 5
const t2 = 30

let first_algo = (matrix) => {
    //copy 
    matrix = matrix.map(line => [...line])
    const sum = (A) => A.reduce((acc, cur) => acc + cur)
    let load = Array(tasks).fill(0)
    matrix.sort(
        (a,b) => sum(b) - sum(a)
    )
    const specificMinFunc = 
        (accumulator, element, index, array) => 
            array[index] + load[index] < array[accumulator] + load[accumulator] 
            ? index : accumulator

    matrix.forEach(
        line => {
            let i = line.reduce(specificMinFunc, 0)
            load[i] += line[i]
        }
    )
    return {
        matrix,
        load,
        min: Math.min(...load),
    }
}

let matrix = Array(cpus).fill().map(
    line => Array(tasks).fill().map(x => randomInt(t1, t2))
)

let res = first_algo(matrix)

console.log(res, matrix)