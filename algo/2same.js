
// ojidaetsa n log n, no tut netu(((
let has_copies = (A) => {
    for (let i = 0; i < A.length; i++) {
        let x = i
        for (let j = i+1; j < A.length; j++) {
            if (A[i] == A[j]) return true
            if (A[x] > A[j]) x = j
        }
        // swap
        let t = A[i]
        A[i] = A[x]
        A[x] = t
    }
    return false
}

let b = [42,3221,321,3213,21552,754,21,321]

let x = has_copies(b)

console.log(b, x)