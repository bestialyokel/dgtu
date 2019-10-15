let rle_decode = text => {
    let numbers = new Set(['-', '1', '2', '3', '4', '5', '6', '7', '8' , '9' , '0']);
    let len = text.length;
    let amount = '';
    let newStr = '';
    let buf = '';
    for (let i = 0; i < len; i++) {
        while (numbers.has(text[i])) {
            amount += text[i];
            i++;
        }
        amount = Number(amount);
        console.log(text[i]);
        console.log(amount);
        if (amount < 0) amount = -amount;
        i += amount;
        amount = '';

        
        
    }
    console.log(newStr);
}

let a = '-4abcd4b6b';

rle_decode(a);