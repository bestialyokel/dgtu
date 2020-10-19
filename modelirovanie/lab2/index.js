const os = require('os');
const fs = require('fs');

const U_FILE = 'ugolok';
const C_FILE = 'centr';
const K_FILE = 'kabara';

//L = 150
const N = 150;
const h = 1;

//время
const T = 1.5;
const t = 0.05;
let t0 = 0;

const a = 0.999;

const y = a * t / h;

if (y > 1) {
    throw "y > 1";
}

let PREV = Array(N).fill(0);
let CUR = PREV.slice();
let NEXT = CUR.slice();

const output = (filename) => {
    fs.truncateSync(filename);
    for (let i = 0; i < N; i++) {
        const str = `${CUR[i].toFixed(30)}${os.EOL}`;
        fs.appendFileSync(filename, str);
    }

    for (let i = 0; i < N; i++) {
        const str = `${i*h}${os.EOL}`;
        fs.appendFileSync(filename, str);
    }
    
}


CUR[0] = 1;
PREV[0] = 1;


//Явная схема(Уголок)
//устойчива только при a >= 0
// и y <=1;
do {
    for (let i = 1; i < N; i++) {
        NEXT[i] = CUR[i] - y * (CUR[i] - CUR[i-1]); 
    }

    PREV = CUR.slice();

    CUR = NEXT.slice();

    t0 = t0 + t;

} while (t0 < T);


output(U_FILE);

//-------------------------------------------------------------------------



PREV = Array(N).fill(0);
CUR = PREV.slice();
NEXT = CUR.slice();


CUR[0] = 1;
PREV[0] = 1;

//Центральная схема
//устойчива только при a >= 0 
// и y <=1;
do {
    for (let i = 1; i < N - 1; i++) {
        NEXT[i] = CUR[i] - y * (CUR[i+1] - CUR[i-1])/2; 
    }

    PREV = CUR.slice();

    CUR = NEXT.slice();

    t0 = t0 + t;

} while (t0 < T);


output(C_FILE);
//-------------------------------------------------------------------------


PREV = Array(N).fill(0);
CUR = PREV.slice();
NEXT = CUR.slice();


CUR[0] = 1;
PREV[0] = 1;


//Кабаре
//устойчива только при a >= 0 
// и y <=1;
do {

    for (let i = 1; i < N - 1; i++) {
        NEXT[i] = CUR[i] - CUR[i - 1] + PREV[i - 1] - 2 * y * (CUR[i] - CUR[i+1]);
    }

    PREV = CUR.slice();

    CUR = NEXT.slice();

    t0 = t0 + t;

} while (t0 < T);


output(K_FILE);

