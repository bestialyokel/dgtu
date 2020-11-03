//....` оно вроде работает

const eps = -1

const empty = 0

const isEmpty = (MatrixCell) => MatrixCell == empty 

//без вывода начальных/конечных состояний 

let RemoveEps = (Matrix, alphabet, states, start, end) => {
    //...
    let visited = 0
    let epsReachable = Array(states).fill( 0 )

    //S0..Sn                               
    let dfsEpsReachable = (vertex) => {
        //пометить как посещенную
        visited |= (1 << vertex)
        //включить саму вершину qi в класс Si
        epsReachable[vertex] |= (1 << vertex)

        for (let i = 0; i < states; i++) {
            //Пропускаем если нет ребер
            if (isEmpty(Matrix[vertex][i]))
                continue

            //рассматриваем только eps переходы
            let epsIndex = Matrix[vertex][i].indexOf(eps)
            if (epsIndex == -1)
                continue;
            //если вершина уже обработана, скопировать ее достижимые состояния, 
            //иначе дальше...
            if ( visited & (1<<i) ) {
                epsReachable[vertex] |= epsReachable[i]
            } else {
                epsReachable[vertex] |= (1 << i)
                dfsEpsReachable(i, eps)
            }
        }
        return epsReachable[vertex]
    }

    //результат в epsReachable
    for (let i = 0; i < states; i++)
        dfsEpsReachable(i)


    //здесь для каждой вершины q достижимые по символу состояния
    let dfsSymbolReachable = (vertex, symbolIndex, reachable = 0, visited = 0, hasSymbol = false) => {
        for (let i = 0; i < states; i++) {
            //Пропускаем если нет ребер
            if (isEmpty(Matrix[vertex][i]))
                continue

            let index = -1

            index = Matrix[vertex][i].indexOf(symbolIndex + 1)
            //есть ребро alphabet[symbolIndex]
            if (index != -1) {
                if (!hasSymbol) {
                    reachable |= epsReachable[i]
                    visited |= (1 << i)
                    hasSymbol = true
                }
                continue
            }
            
            index = Matrix[vertex][i].indexOf(eps)
            //есть ребро eps
            if (index != -1) {

                if (!hasSymbol && visited & (1 << i))
                    continue

                visited |= (1 << i)

                reachable |= dfsSymbolReachable(i, symbolIndex, reachable, visited, hasSymbol) & ~(1 << i)

            }

        }
        return reachable
    }


    //для каждого qi таблица переходов по каждому символу
    let symbolReachable = Array(states).fill().map(x => Array(alphabet.length).fill(0))

    for (let i = 0; i < states; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            symbolReachable[i][j] = dfsSymbolReachable(i, j)
        }
    }

    let newMatrix = Array(states).fill().map(x => Array(states).fill(0))


    for (let i = 0; i < states; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            //(Si, alphabet[j]) -> SiReachable
            let SiReachable = 0

            //Формирование достижимых по alphabet[j] состояний для множества Si
            for (let v = 0; v < states; v++)
                if (epsReachable[i] & (1 << v))
                   SiReachable |= symbolReachable[v][j]


            for (let v = 0; v < states; v++)
                if (epsReachable[v] == (SiReachable & epsReachable[v]))
                    isEmpty(newMatrix[i][v]) ? newMatrix[i][v] = [j+1] : newMatrix[i][v].push(j+1)

            //console.log(SiReachable.toString(2).padStart(4, 0))

        }
    }

    //новые входные/выходные состояния
    let newStart = []
    let newEnd = []
    for (let i = 0; i < start.length; i++)
        for (let v = 0; v < states; v++)
            if (epsReachable[ start[i] ] & (1 << v))
                newStart.push(v)

    for (let i = 0; i < end.length; i++)
        for (let v = 0; v < states; v++)
            if (epsReachable[ end[i] ] & (1 << v))
                newEnd.push(v)


    return {
        matrix: newMatrix,
        start: newStart,
        end: newEnd
    }
}



let Determine = (Matrix, alphabet, states, start, end) => {

    let symbolReachable = (vertex, symbolIndex) => {
        let reachable = 0
        let index = -1
        for (let i = 0; i < states; i++) {
            if (isEmpty(Matrix[vertex][i]))
                continue
            index = Matrix[vertex][i].indexOf(symbolIndex+1)
            if (index != -1)
                reachable |= (1 << i)
        }
        return reachable
    }

    let symbolReachableTable = Array(states).fill().map(x => Array(alphabet.length).fill(0))

    let newMatrix = Array(states).fill().map(x => Array(states).fill(0))

    //let newStart = [0]
    //let newEnd = [0]

    let p = []
    p[0] = 0
    for (let i = 0; i < start.length; i++)
        p[0] |= (1 << start[i])


    for (let i = 0; i < p.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            let reachable = 0
            for (let v = 0; v < states; v++) {
                if (p[i] & (1 << v))
                    reachable |= symbolReachable(v, j)
            }
            let index = p.indexOf(reachable)

            if (reachable == 0)
                continue

            if (index == -1) {
                p.push(reachable)
                index = p.length - 1
            } 

            isEmpty(newMatrix[i][index]) ? newMatrix[i][index] = [j+1] : newMatrix[i][index].push(j+1)
            
        }
    }

    return {
        matrix: newMatrix,
    }

    
}

let alphabet = ["0", "1"]

//если ребрер нет, то 0, иначе массив из (индекс символа из alphabet + 1) | eps( -1 )
let graph = [
    [0, [1], 0, [-1]],
    [0, 0, [-1], [1]],
    [0, 0, [2], 0],
    [0, 0, [2], 0],
]



let x = RemoveEps(graph, alphabet, 4, [0], [2]);

let y = Determine(x.matrix, alphabet, 4, x.start, x.end)

console.log(graph, x.matrix, y.matrix)
