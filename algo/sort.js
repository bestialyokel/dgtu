const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)

let arr = Array(10).fill().map(x => randomInt(-10, 10))

//оценивать каждую операцию в Ci времени, 
let Ins = (a) => { 
    //n
    for (let i = 1; i < a.length; i++) {
        //n - 1
        let j = i
        //n(n+1)/2 -- summ 1..n
        while(j> 0 && a[j] < a[j-1]) {
            // n(n+1)/2 - 1
            let t = a[j-1]
            a[j-1] = a[j]
            a[j] = t
            j -= 1
        }
    }
}

//
let InsRec = (a) => {
    let rec = (a, p, r) => {
        if (p > r) return
        rec(a, p, r - 1)
        let i = r
        while(i > p - 1 && a[i] < a[i-1]) {
            let t = a[i]
            a[i] = a[i-1]
            a[i-1] = t
            i--
        }
    }
    rec(a, 1, a.length - 1)
}

console.log(arr)

InsRec(arr)

console.log(arr)

const Sel = (a) => {
    for(let i = 0; i < a.length; i++) {
        let index = i;
        for (let j = i+1; j < a.length; j++) {
            if (a[j] < a[index]) index = j
        }
        if (index != i) {
            let t = a[index]
            a[index] = a[i]
            a[i] = t
        } 
    }
}

// наверно 0(n)
let Gorn = (a, x) => {
    const G = (a, x, index = 0) => (index == a.length - 1) ? a[index] : a[index] + x*G(a, x, index+1)
    return G(a, x)

}

const MergeSort = (a, p ,r) => {
    const Merge = (a, p, q, r) => {
        // 2 elems
        if (p + 1 == r) {
            if (a[p] > a[r]) {
                const T = a[p]
                a[p] = a[t]
                a[t] = T
            }
            return
        }
        // to Int conv sqrt
        const sub_size = Math.sqrt(r - p) >> 0
        const indexes = Array(a.length/sub_size >> 0).map((x,i) => i*sub_size)
        const buf_start_index = sub_size*indexes.length
        
    }
    if (p < r) {
        const q = (p+r)/2 >> 0
        MergeSort(a, p, q)
        MergeSort(q + 1, r)

    }
}

