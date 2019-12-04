let INF = 1000



let G = [
    [0, 5, 0, 1, 0],
    [0, 0, 1, 2, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 4, 0, 3],
    [0, 0, 0, 0, 0]
]

let FF = (c, s, t) => {
    let n = c.length
    let e = Array(n).fill(0)
    let ftr = Array(n).fill(0)
    let f = Array(n).fill().map(x=>Array(n).fill(0))
    let v = 0

    let label = (f) => {
        let Q = []
        e.fill(0)
        Q.push(s)
        e[s-1] = INF
        ftr[s-1] = 0
        while (e[t-1] == 0 && Q.length != 0) {
            let i = Q.pop()
            for (let j = 0; j < n; j++) 
                if (e[j] == 0 && c[i-1][j]-f[i-1][j] > 0) {
                    e[j] = Math.min(e[i-1], c[i-1][j]-f[i-1][j])
                    ftr[j] = i
                    Q.push(j+1)
                }
            for (let j = 0; j < n; j++)
                if (e[j] == 0 && f[j][i-1] > 0) {
                    e[j] = Math.min(e[i-1], f[j][i-1])
                    ftr[j] = -i
                    Q.push(j+1)
                }
        }
    }
    do {
        label(f)
        if (e[t-1] > 0) {
            v += e[t-1]
            let i = t;
            while (i != s) {
                let j = ftr[i-1]
                if (j > 0) f[j-1][i-1] += e[t-1]
                else f[i-1][-j-1] -= e[t-1]
                i = j
                if (j < 0) i = -j
            }
        }
    } while(e[t-1] != 0)

    console.log(v)
    console.log(f)
}

FF(G, 1, 5)