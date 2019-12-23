let rle_encode = text => {
    let len = text.length;
    let newStr = '';
    let counter = 0;
    let char = '';
    for (let i = 0; i <= len; i++) {
        if (text[i] == char) {
            counter++;
        } else {
            if (counter < 3) newStr += char.repeat(counter);
            else newStr += counter + char;
            char = text[i];
            counter = 1;
        }
    }
    return newStr;
}

rle_encode('ddddwrfzcsrewfffwfww');