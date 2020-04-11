let process = require('process');
let str = 'abcd dcba';

let isP = s => {
    let i = 0;
    let j = s.length - 1;
    while (j > i) 
        if (s[i++] != s[j--]) 
            return false;
    return true;
}

let ftime = process.hrtime();

let a = isP(str);
ftime = process.hrtime(ftime);

console.log(a, ftime);
