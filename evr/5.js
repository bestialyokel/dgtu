const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)
/* Бесконечность */
const INF = -1

const noCheckSpread = ({matrix, tasks}) => {
    /* Копирование матрицы */
    matrix = [...matrix].map(x => [...x])

    /* Сортировка без учета бесконечностей */
    let tasksWithIndex = tasks.map((x,i) => [x, i])
    tasksWithIndex.sort((a,b) => b[0] - a[0])
    matrix = matrix.map((x,i) => matrix[tasksWithIndex[i][1]])

    tasks = tasksWithIndex.map(x => x[0])

    return {
        sortedTasks: tasks,
        sortedMatrix: matrix
    }
}

const checkSpread = ({matrix, tasks}) => {
    /* Копирование матрицы */
    matrix = [...matrix].map(x => [...x])

    /* Подсчет бесонечностей в строке */
    const countINF = (A) => A.reduce((acc, cur, index, array) => {
        return cur == INF ? acc + 1 : acc 
    }, 0)

    /* Сортировка с учетом бесконечностей */
    let tasksWithIndex = tasks.map((x,i) => [x, i])
    tasksWithIndex.sort((a,b) => {
        /* [value, index] */
        let [aVal, aIndex] = a
        let [bVal, bIndex] = b
        let aInf = countINF(matrix[aIndex])
        let bInf = countINF(matrix[bIndex])

        /* по значению, если Оба 0 или оба не 0 */
        if (aInf+bInf == 0 || aInf != 0 && bInf != 0) 
            return bVal - aVal
        
        return bInf - aInf

    })
    matrix = matrix.map((x,i) => matrix[tasksWithIndex[i][1]])

    tasks = tasksWithIndex.map(x => x[0])

    return {
        sortedTasks: tasks,
        sortedMatrix: matrix
    }
}

const countSpread = ({matrix, tasks}) => {
    /* Копирование матрицы */
    matrix = [...matrix].map(x => [...x])

    /* Подсчет бесонечностей в строке */
    const countINF = (A) => A.reduce((acc, cur, index, array) => {
        return cur == INF ? acc + 1 : acc 
    }, 0)

    /* Сортировка с подсчетом бесконечностей */
    let tasksWithIndex = tasks.map((x,i) => [x, i])
    tasksWithIndex.sort((a,b) => {
        /* [value, index] */
        let [aVal, aIndex] = a
        let [bVal, bIndex] = b
        let aInf = countINF(matrix[aIndex])
        let bInf = countINF(matrix[bIndex])

        if (aInf == bInf)
            return bVal - aVal // по значению если одинаково INF

        return bInf - aInf // иначе по числу INF

    })
    matrix = matrix.map((x,i) => matrix[tasksWithIndex[i][1]])

    tasks = tasksWithIndex.map(x => x[0])

    return {
        sortedTasks: tasks,
        sortedMatrix: matrix
    }
}

const criticalPath = ({cpusCount, sortedMatrix, sortedTasks}) => {

    let cpusLoad = Array(cpusCount).fill(0)
    let unhandledTasks = []

    sortedTasks.forEach((task, lineIndex) => {
        /* Индекс наименее загруженного процессора, способного отработать задачу lineIndex */
        let leastLoadIndex = cpusLoad.reduce(
            (acc, cur, index) => {
                /* Процессор index не способен отработать задачу lineIndex, acc без изменений */
                if (sortedMatrix[lineIndex][index] == INF) 
                    return acc
                
                return cur < cpusLoad[acc] || acc == -1 ? index : acc
            }, -1)

        /* Задача не обрабатывается ни 1 процессором? */
        if (leastLoadIndex == -1) {
            unhandledTasks.push(task)
        } else {
            cpusLoad[leastLoadIndex] += task 
        }

    })

    return {
        matrix: sortedMatrix,
        cpusLoad,
        Max: Math.max(...cpusLoad),
        unhandledTasks
    }
}

/* Входные параметры */
const config = {
    cpusCount: 4,
    tasksCount: 9,
    /* вероятность что процессор i 
        не будет способен обработать
        задачу (для генерации матрицы) */
    infProbability: 0.25,
    t1: 4,
    t2: 20
}

const {tasksCount, cpusCount, t1, t2, infProbability} = config

const Tasks = Array(tasksCount).fill().map(x => randomInt(t1, t2))

const Matrix = Array(tasksCount).fill().map(
    (line,i) => Array(cpusCount).fill().map(
        r => Math.random() < infProbability ? INF : Tasks[i] 
    )
)

/* Три модификации сортировки матрицы*/
const nocheck = noCheckSpread({matrix: Matrix, tasks: Tasks})
const check = checkSpread({matrix: Matrix, tasks: Tasks})
const count = countSpread({matrix: Matrix, tasks: Tasks})

/* Распределение без изменений */
const res1 = criticalPath({...config, sortedTasks: nocheck.sortedTasks, sortedMatrix: nocheck.sortedMatrix})
/* С учетом бесконечности */
const res2 = criticalPath({...config, sortedTasks: check.sortedTasks, sortedMatrix: check.sortedMatrix})
/* С учетом количества бесконечностей в строке */
const res3 = criticalPath({...config, sortedTasks: count.sortedTasks, sortedMatrix: count.sortedMatrix})


console.log("Задачи", Tasks)
console.log("Распределение без изменений", res1)
console.log("С учетом бесконечности", res2)
console.log("С учетом количества бесконечностей в строке", res3)