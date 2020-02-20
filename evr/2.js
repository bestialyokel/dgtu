const INF = -1

let getOst = (pairs) => {
    //getSource(... , cur , ...) => cur togda vershina tipa novaya
    //ctr - massiv metok
    let getSource = (ctr, cur, prev = INF) => cur == INF ? prev : getSource(ctr, ctr[cur], cur)
    //naverno, spread - eto dorogo
    //mb VERTEX_AMOUNT Izvestno zaranee
    let VERTEX_AMOUNT = 1 + Math.max(...pairs.map(pair => Math.max(...pair)))
    let ctr = Array(VERTEX_AMOUNT).fill(INF) 

    return pairs.filter(
        (pair) => {
            //hz nado li swapnut
            //if (pair[0] < pair[1]) [ pair[0], pair[1] ] = [ pair[1], pair[0] ]
            let s1 = getSource(ctr, pair[0])
            let s2 = getSource(ctr, pair[1])
            if (s1 != s2)
                ctr[ pair[1] ] = pair[0]
        
            return s1 != s2
        }
    )
            
}

let pairs = [
    [0,1],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [3,0],
    [0,3],
    [2,4]
]

let a = getOst(pairs)

console.log(a)



