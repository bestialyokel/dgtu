const CPU_INDEX = 1
const TASK_INDEX = 0

/**
 * random int int [a,b]
 * @param {number} a 
 * @param {number} b -
 * @returns {number}
 */
const randomInt = (a,b) => Math.round( Math.round(Math.random() * 10)/10 * (b-a) + a )

/**
 * Returns Max of processors load for Pairs individual
 * @param {Array<number>} Spread 
 * @param {Array<number>} Tasks 
 * @returns {number}
 */ 
const Max = (Spread, Tasks) => {
    //index ~~ taskIndex
    const loads = Spread.reduce((acc, cpuIndex, index) => {
        while(cpuIndex >= acc.length) acc.push(0)
        acc[cpuIndex] += Tasks[index][cpuIndex];
        return acc
    }, [])
    return Math.max(...loads)
}


/**
 * 
 * @param {Array<number>} Spread 
 * @returns {Array<number>}
 */
const CopySpread = (Spread) => [...Spread]

/**
 * Makes crossover of 2 spreads return 2 crossed childs
 * @param {Array<number>} leftSpread 
 * @param {Array<number>} rightSpread
 * @returns {Array<number>, Array<number>}
 */
const Cross = (leftSpread, rightSpread) => {
    let first = randomInt(0, leftSpread.length - 1)
    let second = randomInt(0, rightSpread.length - 1)
    while (Math.abs(second - first) < 2) {
        first = randomInt(0, leftSpread.length - 1)
        second = randomInt(0, rightSpread.length - 1)
    }

    if (first > second) {
        const T = first
        first = second
        second = T
    }

    let newLeftSpread = Array(leftSpread.length).fill(0)
    let newRightSpread = Array(leftSpread.length).fill(0)

    //С 0 индекса до первой точки
    for (let i = 0; i < first - 1; i++) {
        newLeftSpread[i] = leftSpread[i]
        newRightSpread[i] = rightSpread[i]
    }

    //С первой включительно до второй точки
    for (let i = first; i < second; i++) {
        newLeftSpread[i] = rightSpread[i]
        newRightSpread[i] = leftSpread[i]
    }

    //со второй точки включительно до последнего индекса
    for (let i = second; i < leftSpread.length; i++) {
        newLeftSpread[i] = rightSpread[i]
        newRightSpread[i] = leftSpread[i]
    }

    return [newLeftSpread, newRightSpread]
}

/**
 * "Invert" 2 indexes of Spread
 * @param {Array<number>} Spread 
 * @returns {Array<number>}
 */
const Mut = (Spread) => {
    let first = randomInt(0, Spread.length - 1)
    let second = randomInt(0, Spread.length - 1)

    while (first == second) {
        first = randomInt(0, Spread.length - 1)
        second = randomInt(0, Spread.length - 1)
    }
    let newPairs = CopySpread(Spread)
    const T = newPairs[first]
    newPairs[first] = newPairs[second]
    newPairs[second] = T
    return newPairs
}

const genAlgo = (Ch, config, Tasks) => {
    const {Nchr, Pcross, MaxMutRepeats, Pmut, stopCount} = config
    //копирование расписаний
    Ch = Ch.map(Spread => CopySpread(Spread))
    let count = 0
    let minMax = Math.min(...Ch.map(Pairs => Max(Pairs, Tasks)))
    do {
        //Здесь будут старое поколение + новое, 
        //отсортируем по Max, выберем Nchr лучшие, занесем вместо Ch
        let newChrs = [...Ch]
        let childCount = 0
        for (let j = 0; j < Nchr; j++) {
            let r = Math.random()
            if (r < Pcross) {
                //исключить j из совпадений
                let indexes = Array(Nchr).fill().map((x,i) => i)
                indexes.splice(j, 1)

                const i = randomInt(0, indexes.length - 1)
                const l = indexes[i]
                const [left, right] = Cross(Ch[j], Ch[l])
                //В следующее поколение на сравнение отправится лучший из 2 потомков
                Max(left, Tasks) < Max(right, Tasks) ? newChrs.push(left) : newChrs.push(right)
                childCount += 1
            }
            r = Math.random()
            if (r < Pmut) {
                //Заменять будем во временной переменной
                newChrs[Ch.length + childCount - 1] = Mut( newChrs[Ch.length + childCount - 1] )
            }
        }
        //отсортировать по возрастанию максимальных нагрузок в процессоре
        newChrs.sort((leftSpread, rightSpread) => Max(leftSpread, Tasks) - Max(rightSpread, Tasks))
        //Заменить следующее поколение на Nchr лучших среди родителей и потомков
        for (let i = 0; i < Nchr; i++)
            Ch[i] = newChrs[i]

        
        let newMinMax = Math.min(...Ch.map(Spread => Max(Spread, Tasks)))
        if (newMinMax != minMax) {
            minMax = newMinMax
            count = 0
        } else {
            count += 1
        }
    } while (count < stopCount)
    return Ch
}


const config = {
    cpusCount: 4,
    tasksCount: 8,
    //число особей
    Nchr: 8,
    //вероятность оператора кроссовера
    Pcross: 0.25,
    //вероятность оператора мутации
    Pmut: 0.15,
    //Число одинаковых минмаксов для выхода из цикла
    stopCount: 30,
    t1: 4,
    t2: 20
}

const {cpusCount, tasksCount, t1, t2, Nchr} = config



//Теперь для каждой задачи генерируется 
// то есть задача - массив cpusCount чисел - времен выполнения на i-ом процессоре
const Tasks = Array(tasksCount).fill().map(task => Array(cpusCount).fill().map(x => randomInt(t1, t2)))


//Массив особоей, где особь - массив в котором для i-го индекса(задачи) лежит индекс процессора
const Ch0 = Array(Nchr).fill().map(
    indiv => Array(Tasks.length).fill().map(x => randomInt(0, cpusCount - 1))
)

const printAsMatrix = (Spread) => {
    let Matrix = Array(cpusCount).fill().map(x => [])
    //value - cpusIndex
    Spread.forEach((value, index) => {
        Matrix[value].push(Tasks[index][value])
    })
    console.log(Matrix)
}

const res = genAlgo(Ch0, config, Tasks)
console.log('Сгенерированные задачи, где каждая строка - задача, а индекс в строке вес на i-том процессоре:', Tasks)
console.log(`Начальное поколение Min(Max(...)) = ${Math.min(...Ch0.map(Spread => Max(Spread, Tasks)))}`)
Ch0.forEach(Spread => printAsMatrix(Spread))
console.log(`Стандартная модификация Min(Max(...)) = ${Math.min(...res.map(Spread => Max(Spread, Tasks)))}`)
res.forEach(Spread => printAsMatrix(Spread))



