const mulExcept = (A) => {
    const N = A.length;

    let R = Array(N);

    let mul = 1;

    for (let i = N - 1; i >= 0; --i) {
        R[i] = mul;
        mul *= A[i];
    }

    mul = 1;
    for (let i = 0; i < N; ++i) {
        R[i] *= mul;
        mul *= A[i];
    }
    
    return R;
}

const SECOND_MS = 1000;

const callLimiter = (f, maxCount, delay = SECOND_MS) => {
    let lastTS = performance.now();
    let cnt = 0;

    return (...args) => {
        const nowTS = performance.now();

        
        if (nowTS - lastTS >= delay) {
            console.log(nowTS, lastTS, '---')
            lastTS = nowTS;
            cnt = 0;  
        }

        if (cnt < maxCount) {
            cnt += 1;
            return f(...args);
        }
 
    }
}



const X = [1,2,3,4,5];

let y = mulExcept(X);

console.log(y.toString());


const btn = document.getElementsByTagName('button')[0];

const handler = (event) => {
    console.log(event); 
};


let log = callLimiter(handler, 3);

for (let i = 0; i < 1000; i++) {
    log('log');
}

btn.addEventListener('click', callLimiter(handler, 3));



