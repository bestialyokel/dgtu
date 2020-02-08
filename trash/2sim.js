

let has = (A) => {
    let XOR = 0;
    for (let i = 0; i < A.length; i++) {
        XOR ^= A[i]
    }
    return XOR;
}

let a = Array(30).fill(0).map( (x, i) => i)

a.push(2)

console.log(a)
console.log(has(a))