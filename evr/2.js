const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)
const sum = (A) => A.reduce((acc, cur) => acc + cur)

const min_sum_task_load = (inMatrix, config) => {
    const {cpus, tasks, t1, t2, sortOrder} = config
    //copy 
    const specificMinFunc = 
        (accumulator, element, index, array) => 
            array[index] + load[index] < array[accumulator] + load[accumulator] 
            ? index : accumulator
    let load = Array(tasks).fill(0)
    const matrix = inMatrix.map(line => [...line])
    matrix.sort( (a,b) => sortOrder * (sum(a) - sum(b))  )
    matrix.forEach(
        line => {
            const i = line.reduce(specificMinFunc, 0)
            load[i] += line[i]
        }
    )
    return {
        matrix,
        load,
        max: Math.max(...load),
    }
}

const min_task = (inMatrix, config) => {
    const {cpus, tasks, t1, t2, sortOrder} = config
    const specificMinFunc = 
        (accumulator, element, index, array) => array[index] < array[accumulator] ? index : accumulator
    let load = Array(tasks).fill(0)
    const matrix = inMatrix.map(line => [...line])
    matrix.sort( (a,b) => sortOrder * (sum(a) - sum(b)) )
    matrix.forEach(
        line => {
            const i = line.reduce(specificMinFunc, 0)
            load[i] += line[i]
        }
    )
    return {
        matrix,
        load,
        max: Math.max(...load),
    }
}

const config = {
    cpus: 5,
    tasks: 3,
    t1: 5,
    t2: 30,
}
const {cpus, tasks, t1, t2} = config

const matrix = Array(cpus).fill().map(
    line => Array(tasks).fill().map(x => randomInt(t1, t2))
)
const res1 = min_sum_task_load(matrix, {...config, sortOrder: 1})
const res2 = min_sum_task_load(matrix, {...config, sortOrder: -1})
const res3 = min_task(matrix, {...config, sortOrder: 1})
const res4 = min_task(matrix, {...config, sortOrder: -1})

console.log("Алгоритм построения расписания с произвольной загрузкой, по возрастанию")
console.log(res1)
console.log("Алгоритм построения расписания с произвольной загрузкой, по убыванию")
console.log(res2)
console.log("Минимальный элемент в строке, по возрастанию")
console.log(res3)
console.log("Минимальный элемент в строке, по убыванию")
console.log(res4)
