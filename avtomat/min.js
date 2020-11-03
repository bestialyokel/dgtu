

//https://neerc.ifmo.ru/wiki/index.php?title=Минимизация_ДКА,_алгоритм_Хопкрофта_(сложность_O(n_log_n))


//Inv[r][a] — массив состояний, из которых есть ребра по символу a в состояние r 
//(мы не меняем исходный автомат, потому может 
//быть построен раз перед началом работы алгоритма).
const Min = (Inv, alphabet, states, endStates) => {  

    //Class[r] — номер класса, которому принадлежит состояние r
    let Class = Array(states).fill(0)

    //Здесь хранятся все классы, дробятся и тд
    let P = [new Set(), endStates]

    //Инициализация начальнных классов остальные - конечные
    //а также инициализация Class - принадлежности
    //состояния i к классу в P
    for (let i = 0; i < states; i++) {
        if (!endStates.has(i)) {
            P[0].add(i)

            Class[i] = 0

        } else {
            Class[i] = 1
        }
    }
    
    //Queue — очередь пар ⟨C, a⟩, где C — номер класса (сплиттера),
    let queue = []
    
    //в queue будут лежать пары <classIndex, symbolIndex>
    for (let index in alphabet) {
        queue.push( [0, index] )
        queue.push( [1, index] )
    }

    while (queue.length != 0) {
        //извлечь очередную пару из очереди
        const [c, a] = queue.pop()
        //Involved — ассоциативный массив из 
        //номеров классов в векторы из номеров вершин.
        let Involved = []
        //для каждой вершн из класса P[c] (очередной класс)
        for (const q of P[c]) {
            //для каждой вершины, из которой есть ребра в q по символу a(индекс из alphabet)
            for (const r of Inv[q][a]) {
                //индекс класса в P, к которму принадлежит вершина r
                let i = Class[r]
                if (Involved[i] == null)
                    Involved[i] = new Set()
                Involved[i].add(r)
            }
        }
        
        //перебор ключей Involved(обход Involved)
        for (const i in Involved) {
            //
            if (Involved[i].size < P[i].size) {
                //Создать новый класс в P
                P.push( new Set() )
                //Запомнить его индекс
                let j = P.length - 1

                //удалить вершину из старого класса
                //занести в новый 
                for (const r of Involved[i]) {
                    P[i].delete(r)
                    P[j].add(r)
                }


                if (P[j].size > P[i].size) {
                    let T = P[i]
                    P[i] = P[j]
                    P[j] = T
                }
                
                //Для каждой вершины нового класса, изменить 
                //принадлежность к классу на j-ый
                for (const r of P[j]) {
                    Class[r] = j
                }
                
                //внести пары для нового класса в очередь
                for (const c in alphabet) {
                    queue.push( [j, c] )
                }
            }
        }
    }

    let newMatrix = Array(P.length).fill().map(x => Array(P.length).fill(0))

    //понять куда ведут его ребра

    
    //i - состояние
    for (const i in Class) {
        //j - индекс символа
        for (let j = 0; j < alphabet.length; j++) {
            for (const r of Inv[i][j]) {
                //console.log(r, i, alphabet[j])
                //console.log(Class[r], Class[i], typeof j)

                //<r,i,j> - ребра автомата
                newMatrix[ Class[r] ][ Class[i] ] == 0 ? newMatrix[ Class[r] ][ Class[i] ] = new Set([j+1]) : newMatrix[ Class[r] ][ Class[i] ].add(j+1)
            }
        }
    }

    for (let i = 0; i < P.length; i++) {
        for (let j = 0; j < P.length; j++) {
            if (newMatrix[i][j] != 0)
                newMatrix[i][j] = Array.from( newMatrix[i][j] )
        }
    }

    console.log('Классы эквивалентности, порядок соответствует порядку в новой матрице:\n', P)

    console.log(newMatrix)

}


// auto[r][a] - массив состояний
// из которых есть ребра по символу a(индекс из alphabet) в состояние r
//наверно можно построить программно и из матрицы.
const Inv = [
    [
        [0,2],
        []
    ],
    [
        [],
        [0,1]
    ],
    [
        [1],
        []
    ],
    [
        [],
        [2,3,4,5]
    ],
    [
        [3],
        []
    ],
    [
        [4,5],
        []
    ]
]


let x = Min(Inv, ["0", "1"], 6,  new Set([3,4,5]) )
