const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)
const sum = (A) => A.reduce((acc, cur) => acc + cur, 0)
const maxIndex = (A) => A.reduce((acc, cur, index, array) => cur > array[acc] ? index : acc, 0)
const minIndex = (A) => A.reduce((acc, cur, index, array) => cur < array[acc] ? index : acc, 0)

//для обращений к парам (задача, процессор)
const CPU_INDEX = 1
const WEIGHT = 0

const Max = (Pairs) => {
    const loads = Pairs.reduce((acc, [weight, index]) => {
        while(index >= acc.length) acc.push(0)
        acc[index] += weight;
        return acc
    }, [])
    return Math.max(...loads)
}
const CopyPairs = (Pairs) => Pairs.map(([left, right]) => [left, right])


//Пускай кросс - выбор лучшего из двух.
const Cross = (leftPairs, rightPairs) => Max(leftPairs) < Max(rightPairs) ? CopyPairs(leftPairs) : CopyPairs(rightPairs)

//Пускай оператор мутация => N раз перекидывать задачи между процессорами
const Mut = (Pairs) => {
    let newPairs = CopyPairs(Pairs)
    //случайное число раз
    const repeats = randomInt(0, Pairs.length - 1)
    for (let i = 0; i < repeats; i++) {
        //случайной задаче поменять процессор на случайный?
        const firstIndex = randomInt(0, newPairs.length - 1)
        const secondIndex = randomInt(0, newPairs.length - 1)

        //обмен индексами у двух задач
        const T = newPairs[firstIndex][CPU_INDEX]
        newPairs[firstIndex][CPU_INDEX] = newPairs[secondIndex][CPU_INDEX]
        newPairs[secondIndex][CPU_INDEX] = T
    }
    return newPairs
}

const defMod = (Ch, config) => {
    const {Nchr, Pcross, Pmut, stopCount} = config
    //копирование расписаний
    Ch = Ch.map(Pairs => CopyPairs(Pairs))
    let count = 0
    let minMax = Math.min(...Ch.map(Pairs => Max(Pairs)))

    do {
        for (let j = 0; j < Nchr; j++) {
            let r = Math.random()
            if (r < Pcross) {
                //исключить j из совпадений
                let indexes = Array(Nchr).fill().map((x,i) => i)
                indexes.splice(j, 1)

                const i = randomInt(0, indexes.length - 1)
                const l = indexes[i]
                Ch[j] = Cross(Ch[j], Ch[l])
            }
            r = Math.random()
            if (r < Pmut) {
                Ch[j] = Mut(Ch[j])
            }
        }
        //Посчитать новый минмакс
        let newMinMax = Math.min(...Ch.map(solution => Max(solution)))
        if (newMinMax != minMax) {
            minMax = newMinMax
            count = 0
        } else {
            count += 1
        }
    } while (count < stopCount)
    return Ch
}

const crossMod = (Ch, config) => {
    const {Nchr, Pcross, Pmut, stopCount} = config
    //копирование расписаний
    Ch = Ch.map(Pairs => CopyPairs(Pairs))
    let count = 0
    let minMax = Math.min(...Ch.map(Pairs => Max(Pairs)))
    do {
        for (let j = 0; j < Nchr; j++) {
            let r = Math.random()
            if (r < Pcross) {
                //исключить j из совпадений
                let indexes = Array(Nchr).fill().map((x,i) => i)
                indexes.splice(j, 1)

                let i = randomInt(0, indexes.length - 1)
                let l = indexes[i]
                indexes.splice(i, 1)

                i = randomInt(0, indexes.length - 1)
                let k = indexes[i]

                const best = Max(Ch[k]) < Max(Ch[l]) ? CopyPairs(Ch[k]) : CopyPairs(Ch[l])
                Ch[j] = Cross(Ch[j], best)
            }

            r = Math.random()
            if (r < Pmut) {
                Ch[j] = Mut(Ch[j])
            }
        }
    
        //Посчитать новый минмакс
        let newMinMax = Math.min(...Ch.map(solution => Max(solution)))
        
        if (newMinMax != minMax) {
            minMax = newMinMax
            count = 0
        } else {
            count += 1
        }

    } while (count < stopCount)

    return Ch
}

const tournamentMod = (Ch, config) => {
    const {Nchr, Pcross, MaxMutRepeats, Pmut, stopCount} = config
    //копирование расписаний
    Ch = Ch.map(Pairs => CopyPairs(Pairs))
    let count = 0
    let minMax = Math.min(...Ch.map(Pairs => Max(Pairs)))

    do {
        for (let j = 0; j < Nchr; j++) {
            let newCh = CopyPairs(Ch[j])
            let r = Math.random()
            if (r < Pcross) {
                //исключить j из совпадений
                let indexes = Array(Nchr).fill().map((x,i) => i)
                indexes.splice(j, 1)

                const i = randomInt(0, indexes.length - 1)
                const l = indexes[i]
                newCh = Cross(Ch[j], Ch[l])
            }
            r = Math.random()
            if (r < Pmut) {
                newCh = Mut(newCh)
            }

            if (Max(newCh) < Max(Ch[j])) {
                Ch[j] = newCh
            }
            
        }
        //Посчитать новый минмакс
        let newMinMax = Math.min(...Ch.map(solution => Max(solution)))
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
    tasksCount: 1000,
    //число особей
    Nchr: 100,
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

const printAsMatrix = (Pairs) => {
    let Matrix = Array(cpusCount).fill().map(x => [])
    Pairs.forEach(([weight, index]) => {
        Matrix[index].push(weight)
    })
    console.log(Matrix)
}

//Максимальная нагрузка процессора в матрице
const Tasks = Array(tasksCount).fill().map(x => randomInt(t1, t2))
//Больше не матрица, а массив пар - [задача, процессор], нужно для кроссов...
const Ch0 = Array(Nchr).fill().map(
    Chj => Tasks.map( x => [x, randomInt(0, cpusCount - 1)] )
)


const res1 = defMod(Ch0, config)
const res2 = crossMod(Ch0, config)
const res3 = tournamentMod(Ch0, config)

console.log(`Начальное поколение Min(Max(...)) = ${Math.min(...res1.map(solution => Max(solution)))}`)
//Ch0.forEach(Pairs => printAsMatrix(Pairs))

console.log('Модификации генетического алгортима')
console.log(`Стандартная модификация Min(Max(...)) = ${Math.min(...res1.map(solution => Max(solution)))}`)
//res1.forEach(Pairs => printAsMatrix(Pairs))

console.log(`Модификация кроссовера Min(Max(...)) = ${Math.min(...res2.map(solution => Max(solution)))}`)
//res2.forEach(Pairs => printAsMatrix(Pairs))

console.log(`Модификация турнирная Min(Max(...)) = ${Math.min(...res3.map(solution => Max(solution)))}`)
//res3.forEach(Pairs => printAsMatrix(Pairs))
