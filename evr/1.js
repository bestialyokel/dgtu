const randomArray = (amount, a, b) => [...Array(amount)].map(x => Math.round(Math.random() * (b-a) + a) );

let minIndex = (A) => {
    let index = 0
    for (let i = 0; i < A.length; i++) if (A[i] < A[index]) 
        index = i
    return index
}

let shell_sort = a => {
    let seq = Array(40)
    let inc, i, j;
    let increment = Arr => {
        let p1, p2, p3, s
        p1 = p2 = p3 = 1
        s = -1
        do {
            if (++s & 1) {
                Arr[s] = 8*p1 - 6*p2 + 1
            } else {
                Arr[s] = 9*p1 - 9*p3 + 1
                p2 *= 2
                p3 *= 2
            }
            p1 *= 2
        } while (3*Arr[s] < Arr.length)
        return s > 0 ? --s : 0
    }
    // последовательность приращений
    let s = increment(seq)
    while (s >= 0) {
        inc = seq[s--]
        for (i = inc; i < a.length; i++) {
            let temp = a[i]
            for (j = i - inc; (j >= 0) && (a[j] > temp); j -= inc)
                a[j+inc] = a[j]
            a[j+inc] = temp
        }
    }
}

const cpus = 5
const tasks_amount = 14
const t1 = 10
const t2 = 28

const load = Array(cpus).fill(0)


const tasks = randomArray(tasks_amount, t1, t2)

// do sort
//tasks.sort((a, b) => b-a);

let printmatrix = (m) => {
    for(let i = 0; i < m.length; i++) {
        console.log(m[i].join(' '))
    }
}


console.log(" RANDOM ")

tasks.forEach(x => {
    let least = minIndex(load)
    load[least] += x
})

let matrix = Array(cpus).fill(tasks)
printmatrix(matrix)

console.log(load)

console.log(" RANDOM ")


load.fill(0)

shell_sort(tasks);

console.log("UB")

tasks.forEach(x => {
    let least = minIndex(load)
    load[least] += x
})

matrix = Array(cpus).fill(tasks)
printmatrix(matrix)

console.log(load)

console.log("UB")

tasks.reverse()

load.fill(0)


console.log("VOZR")


tasks.forEach(x => {
    let least = minIndex(load)
    load[least] += x
})

matrix = Array(cpus).fill(tasks)
printmatrix(matrix)

console.log(load)

console.log("VOZR")

