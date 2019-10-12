let RLE_ENCODE = str => {
    let newStr = "";
    let counter = 1;
    let length = str.length;
    let notEqBuf = "";
    for (let i = 0; i < length; i++) {
        if (notEqBuf[notEqBuf.length - 1] != str[i]) {

        }
        notEqBuf += str[i];
    }
    return newStr;
}

let RLE_DECODE = code => {
    let newStr = ""

}

console.log(RLE_ENCODE('ABDSAASGRQWFAS'));