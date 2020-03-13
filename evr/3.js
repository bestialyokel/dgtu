const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)


const sum = (A) => A.reduce((acc, cur) => acc + cur)

const maxIndex = (A) => A.reduce((acc, cur, index, array) => array[acc] > cur ? acc : index, 0)
const minIndex = (A) => A.reduce((acc, cur, index, array) => array[acc] < cur ? acc : index, 0)

const config = {
    cpus: 3,
    tasks: 10,
    t1: 10,
    t2: 22
}

const {cpus, tasks, t1, t2} = config


let fmod = (proc, config) => {
    const {cpus, tasks, t1, t2} = config
    proc = proc.map(x => [...x])
    let sums = proc.map(x => x.length == 0 ? 0 : sum(x))
    let tmax = Math.max(...sums)
    let tmin = Math.min(...sums)
    let delta = tmax - tmin

    
    console.log(sums)
    console.log(maxIndex(sums))

    //console.log(proc)
}


let tl = Array(tasks).fill().map(x => randomInt(t1, t2)) 

let proc = Array(cpus).fill().map(x => [])
tl.forEach(x => {
    let index = randomInt(0, cpus - 1)
    proc[index].push(x)
})

let x = fmod(proc, config)

/*

Tmax - стобца макс
Tmin - столбца мин

delta = Tmax-Tmin

m заданий на n процессоров

ищем Tmax и Tmin

находим delta = Tmax - Tmin

1. Tmax в макс столбце находим первый попавшийся элемент и если он меньше delta
перебрасываем его на Tmin, опять считаем Tmax Tmin и delta

продолжать пока не найдется Tmax ни 1 элемента, который можно сбросить в Tmin

2. В макс столбце ищем элемент, от которого можно отнять 1 из элементов Tmin и разница будет меньше delta
как только такой элем найден, производим обмен элементами между Tmax и Tmin 

заканчивается если в Tmax не найдется ни 1 такого элемента 

результат макс значение

модификации

2. сортировка столбцов по убыванию

3. Начальное распределение получаетс алгоритмом критического пути, когда задания в порядке убывания

4. начальное распределение путем применения алгортима критического пути, задания упорядочены в порядке возрастания



*/