const fs = require('fs');



if (process.argv.length < 5) {
    console.log('use: node rle *filename_input* [-e || -d] *filename_output*');
    console.log(' -e -- encode, -d -- decode');
    return;
}

let input = process.argv[2];
let action = process.argv.includes('-e') ? '-e' : '-d'
let output = process.argv[4];

if (!fs.existsSync(input)) {
    console.log(`${input} doen't exists`);
    return;
}

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




if (action == '-e') {
    fs.readFile(input, 'utf8', function(err, data) {
        if (err) throw err;
        fs.writeFile(output, rle_encode(data), function(err) {
            if (err) return console.log(err);
            console.log(`${input} was encoded to ${output}`);
        })
    });
    return;
}

if (action == '-d') {
    fs.readFile(input, 'utf8', function(err, data) {
        if (err) throw err;
        fs.writeFile(output, rle_decode(data), function(err) {
            if (err) return console.log(err);
            console.log(`${input} was decoded to ${output}`);
        })
    });
    return;
}

console.log('FILE WASNT DECODED CAUSE SOME ERROR...');
