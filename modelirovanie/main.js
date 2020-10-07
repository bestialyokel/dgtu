
let N = 100;

let t0 = 0;

let T = 10;

let tau = 0.1;

let u = 2;

let h = 1;

let PREV = Array(N).fill(0);

let CUR = Array(N).fill(0);

let NEXT = Array(N).fill(0);

PREV[0] = 1;
CUR[0] = 1;

do {

    for (let i = 1; i < N; i++) {
        NEXT[i] = CUR[i-1] - u * tau * (CUR[i-1] - PREV[i-1]) / h;

    }

    PREV = [...CUR];

    CUR = [...NEXT];

    t0 += tau;



} while (t0 < T);

console.log(NEXT);