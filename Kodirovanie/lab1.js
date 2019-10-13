const readline = require('readline');
const fs = require('fs');

let RLE = text => {
    let len = text.length;
    let newStr = '';
    let counter = 1;
    let buf = text[0];
    let isEqual = false;
    for (let i = 1; i < len; i++) {
        if (buf[buf.length - 1] == text[i]) {
            if (isEqual) counter++;
            else {
                isEqual = true;
                newStr += -(buf.length-1) + buf.slice(0, -1); // output
                buf = text[i];
                counter = 2;
            }
        } else {
            if (isEqual) {
                isEqual = false;
                newStr += counter + buf; // output
                buf = text[i];
                counter = 1;
            } else buf += text[i];
        }
    }

    if (isEqual) newStr += counter + buf;
    else newStr += -(buf.length) + buf;

    return newStr;
}

let a = RLE('ababbaecceeec');

console.log(a);
