const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)
const sum = (A) => A.reduce((acc, cur) => acc + cur, 0)
const maxIndex = (A) => A.reduce((acc, cur, index, array) => cur > array[acc] ? index : acc, 0)
const minIndex = (A) => A.reduce((acc, cur, index, array) => cur < array[acc] ? index : acc, 0)


const halfSpread = ({cpusCount, tasks}) => {
    let procPair = Array(2).fill().map(x => [])
    let load = Array(2).fill(0)

    tasks = [...tasks].sort((a,b) => b-a)

    tasks.forEach(task => {
        let index = minIndex(load)
        load[index] += task
        procPair[index].push(task)
    })

    let left = Array(cpusCount/2).fill().map(x => [])
    let right = Array(cpusCount/2).fill().map(x => [])

    load = Array(cpusCount/2).fill(0)

    procPair[0].forEach(task => {
        let index = minIndex(load)
        load[index] += task
        left[index].push(task)
    })

    load = Array(cpusCount/2).fill(0)

    procPair[1].forEach(task => {
        let index = minIndex(load)
        load[index] += task
        right[index].push(task)
    })

    const leftSums = left.map(x => sum(x))
    const rightSums = right.map(x => sum(x))
    const finalSums = [...leftSums, ...rightSums]

    const Max = Math.max(...finalSums)

    return {
        tasks,
        procPair,
        left,
        leftSums,
        right,
        rightSums,
        finalSums,
        Max
    }
}

const config = {
    cpusCount: 4,
    tasksCount: 10,
    t1: 10,
    t2: 20, 
}

const {tasksCount, cpusCount, t1, t2} = config

const tasks = Array(tasksCount).fill().map(x => randomInt(t1, t2))

let x = halfSpread({...config, tasks})

console.log(x)