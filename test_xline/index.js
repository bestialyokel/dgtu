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

const callLimiter = (f, delay) => {
    let timerId = 0;

    const runLock = () => {
        timerId = setTimeout(() => timerId = 0, delay);
    };

    return (...args) => {
        if (timerId != 0)
            return;
        
        runLock();
        f(...args);
    }
}



const X = [1,2,3,4,5];

let y = mulExcept(X);

console.log(y.toString());





const btn = document.getElementsByTagName('button')[0];

const handler = (event) => {
    console.log(event);
};

/*

    Это не работает.

*/
let log = callLimiter(handler, 10);

for (let i = 0; i < 1000; i++) {
    console.log(i)
    log('log');
}

btn.addEventListener('click', callLimiter(handler, 1000));



