
let rle_encode = text => {
    let newStr = '';
    let counter = 0;
    let buf = '';
    let equal = false;
    for (let i = 0; i < text.length; i++) {
        if (buf[buf.length - 1] == text[i]) {
            if (equal) counter++;
            else {
                equal = true;
                newStr += -(buf.length) + buf;

            }
        }
        else {
            newStr += counter + buf;
            buf = text[i];
            counter = 1;
        }
    }
    console.log(newStr);
}


let a = 'aabbccedeec';

rle_encode(a);