const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)

const cpus = 5
const tasks = 3
const t1 = 5
const t2 = 30

let min_sum_task_load = (matrix) => {
    //copy 
    matrix = matrix.map(line => [...line])
    const sum = (A) => A.reduce((acc, cur) => acc + cur)
    let load = Array(tasks).fill(0)
    const specificMinFunc = 
        (accumulator, element, index, array) => 
            array[index] + load[index] < array[accumulator] + load[accumulator] 
            ? index : accumulator
    matrix.sort(
        (a,b) => sum(b) - sum(a)
    )
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

let min_task = (matrix) => {
    //copy 
    matrix = matrix.map(line => [...line])
    const sum = (A) => A.reduce((acc, cur) => acc + cur)
    const specificMinFunc = 
        (accumulator, element, index, array) => array[index] < array[accumulator] ? index : accumulator

    let load = Array(tasks).fill(0)
    matrix.sort(
        (a,b) => sum(b) - sum(a)
    )
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

let res1 = min_sum_task_load(matrix)
let res2 = min_task(matrix)
console.log("минимум с учетом загрузки процессора")
console.log(res1)
console.log("минимум среди задач")
console.log(res2)
console.log("матрица")
console.log(matrix)