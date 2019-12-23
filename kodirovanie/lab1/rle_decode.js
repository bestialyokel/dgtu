let rle_decode = text => {
    let numbers = new Set(['-', '1', '2', '3', '4', '5', '6', '7', '8' , '9' , '0']);
    let amount = '';
    let newStr = '';
    for (let i = 0; i < text.length; i++) {
        while(numbers.has(text[i])) {
            amount += text[i];
            i++;
        }
        amount = Number(amount);
        if (amount > 0) {
            newStr += text[i].repeat(amount);
            amount = 0;
        }
        else newStr += text[i];
    }
    return newStr;
}

rle_decode('2b2c')