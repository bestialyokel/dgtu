
let N = 10;

let t0 = 0;

let T = 100;

let tau = 0.1;

let u = 0.99;

let h = 0.99;

let PREV = Array(N).fill(0);

let CUR = Array(N).fill(0);

let NEXT = Array(N).fill(0);

PREV[0] = 1;
CUR[0] = 1;

do {

    for (let i = 1; i < N; i++) {
        NEXT[i] = CUR[i] - u * tau * (CUR[i] - CUR[i-1]) / h;

    }


    PREV = [...CUR];

    CUR = [...NEXT];


    t0 += tau;



} while (t0 < T);

console.log(CUR, PREV);