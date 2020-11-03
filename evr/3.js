

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
123
заканчивается если в Tmax не найдется ни 1 такого элемента 

результат макс значение

модификации

2. сортировка столбцов по убыванию

3. Начальное распределение получаетс алгоритмом критического пути, когда задания в порядке убывания

4. начальное распределение путем применения алгортима критического пути, задания упорядочены в порядке возрастания



*/

const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)
const sum = (A) => A.reduce((acc, cur) => acc + cur, 0)
const maxIndex = (A) => A.reduce((acc, cur, index, array) => cur > array[acc] ? index : acc, 0)
const minIndex = (A) => A.reduce((acc, cur, index, array) => cur < array[acc] ? index : acc, 0)


const config = {
    cpusCount: 3,
    tasksCount: 10,
    t1: 10,
    t2: 20, 
}

const {tasksCount, cpusCount, t1, t2} = config

const tasks = Array(tasksCount).fill().map(x => randomInt(t1, t2))

/* 
    Случайное распределение и критический путь 
*/

const randomSpreadMatrix = ({cpusCount, tasks}) => {
    let matrix = Array(cpusCount).fill().map(x => [])
    tasks.forEach(task => {
        let index = randomInt(0, cpusCount - 1)
        matrix[index].push(task)
    })
    return matrix
}

const criticalSpreadMatrix = ({cpusCount, sortOrder, tasks}) => {
    let matrix = Array(cpusCount).fill().map(x => [])

    tasks = [...tasks].sort((a,b) => sortOrder * (a-b))

    let cpusLoads = Array(cpusCount).fill(0)
    tasks.forEach(task => {
        let index = minIndex(cpusLoads)
        cpusLoads[index] += task
        matrix[index].push(task)
    })
    return matrix
}

/*
    Различные модификации алгоритма крона?
*/

const defaultMod = ({cpusCount, matrix}) => {
    /* Копирование матрицы */

    matrix = matrix.map(x => [...x])

    let cpusLoads = Array(cpusCount).fill().map((x, i) => sum(matrix[i])) 
    let TmaxIndex = maxIndex(cpusLoads)
    let TminIndex = minIndex(cpusLoads)
    let delta = cpusLoads[TmaxIndex] - cpusLoads[TminIndex]
    let transportingIndex = matrix[TmaxIndex].findIndex(x => x < delta)

    while (transportingIndex != -1) {
        let transportingElement = matrix[TmaxIndex].splice(transportingIndex, 1)[0]
        matrix[TminIndex].push(transportingElement)

        cpusLoads[TmaxIndex] -= transportingElement
        cpusLoads[TminIndex] += transportingElement
        TmaxIndex = maxIndex(cpusLoads)
        TminIndex = minIndex(cpusLoads)
        delta = cpusLoads[TmaxIndex] - cpusLoads[TminIndex]
        transportingIndex = matrix[TmaxIndex].findIndex(x => x < delta)
    }

    let isFound = false
    do {
        isFound = false
        matrix[TmaxIndex].forEach((x,i) => {
            matrix[TminIndex].forEach((y,j) => {
                if (x-y > 0 && x - y < delta) {
                    isFound = true

                    let t = matrix[TmaxIndex][i]
                    matrix[TmaxIndex][i] = matrix[TminIndex][j]
                    matrix[TminIndex][j] = t
                }
            })
        })
    } while (isFound) 

    cpusLoads = cpusLoads.map((x,i) => sum(matrix[i]))    

    return {
        matrix,
        Tmax: Math.max(...cpusLoads),
        Tmin: Math.min(...cpusLoads),
        cpusLoads
    }
}

const secondMod = ({cpusCount, matrix}) => {
    /* Копирование матрицы */
    matrix = matrix.map(x => [...x])


    matrix.forEach(x => x.sort((a,b) => b-a))

    let cpusLoads = Array(cpusCount).fill().map((x, i) => sum(matrix[i])) 
    let TmaxIndex = maxIndex(cpusLoads)
    let TminIndex = minIndex(cpusLoads)
    let delta = cpusLoads[TmaxIndex] - cpusLoads[TminIndex]
    let transportingIndex = matrix[TmaxIndex].findIndex(x => x < delta)

    while (transportingIndex != -1) {
        let transportingElement = matrix[TmaxIndex].splice(transportingIndex, 1)[0]
        /*
            Tmax И Tmin отсортированы, значит удаление из Tmax не нарушит
            это свойство, а в Tmin необходимо просто закинуть в нужную позицию
        */
        let insertionIndex = matrix[TminIndex].findIndex(x => x < transportingElement)
        if (insertionIndex == -1) 
            insertionIndex = matrix[TminIndex].length

        matrix[TminIndex].splice(insertionIndex, 0, transportingElement)

        cpusLoads[TmaxIndex] -= transportingElement
        cpusLoads[TminIndex] += transportingElement
        TmaxIndex = maxIndex(cpusLoads)
        TminIndex = minIndex(cpusLoads)
        delta = cpusLoads[TmaxIndex] - cpusLoads[TminIndex]
        transportingIndex = matrix[TmaxIndex].findIndex(x => x < delta)
    }
    
    let isFound = false
    
    do {
        isFound = false
        matrix[TmaxIndex].forEach((x,i) => {
            matrix[TminIndex].forEach((y,j) => {
                if (x-y > 0 && x - y < delta) {
                    isFound = true

                    let t = matrix[TmaxIndex][i]
                    matrix[TmaxIndex][i] = matrix[TminIndex][j]
                    matrix[TminIndex][j] = t
                    
                }
            })
        })
    } while (isFound) 

    cpusLoads = cpusLoads.map((x,i) => sum(matrix[i]))    

    return {
        matrix,
        Tmax: Math.max(...cpusLoads),
        Tmin: Math.min(...cpusLoads),
        cpusLoads
    }
}

/* Необходимые матрицы */
const randomMatrix = randomSpreadMatrix({...config, tasks})
const criticalIncMatrix = criticalSpreadMatrix({...config, sortOrder: 1, tasks})
const criticalDecMatrix = criticalSpreadMatrix({...config, sortOrder: -1, tasks})

/* Первая модификация */
const res1 = defaultMod({...config, matrix: randomMatrix})
/* Вторая модификация */
const res2 = secondMod({...config, matrix: randomMatrix})
/* Третья модификация */
const res3 = defaultMod({...config, matrix: criticalDecMatrix})
/* четвертая модификация */
const res4 = defaultMod({...config, matrix: criticalIncMatrix})

console.log("Алгоритм крона(дефолт)", res1)
console.log("Вторая модификация - сортировка столбцов по убыванию", res2)
console.log("Третья модификация - начальное распределение алгоритмом критического пути, задания по убыванию", res3)
console.log("Третья модификация - начальное распределение алгоритмом критического пути, задания по возрастанию", res4)
