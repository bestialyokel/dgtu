const fs = require('fs');

if (process.argv.length < 5) {
    console.log('usage *filename_input* -e || -d *filname_output*');
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

let rle_encode = text => {
    let len = text.length;
    let newStr = '';
    let counter = 0;
    let buf = '';
    let wasEqual = true;
    for (let i = 0; i < len; i++) {
        if (buf[buf.length - 1] == text[i]) {
            if (wasEqual) counter++;
            else {
                wasEqual = true;
                if (buf.length == 2) newStr += 1 + buf.slice(0, -1);                        //OUTPUT
                else if (buf.length != 1) newStr += -(buf.length - 1) + buf.slice(0, -1);   
                buf = text[i];
                counter = 2;
            }
        } else {
            if (wasEqual) {
                wasEqual = false;
                if (counter != 0) newStr += counter + buf; //OUTPUT
                buf = text[i];
                counter = 1;
            }
            else buf += text[i];
        }
    }
    if (wasEqual) newStr += counter + buf;
    else {
        if (buf.length == 1) newStr += 1 + buf  //OUTPUT
        else  newStr += -buf.length + buf;
    }
    return newStr;
}




if (action == '-e') {
    fs.readFile('text.txt', 'utf8', function(err, data) {
        if (err) throw err;
        fs.writeFile(output, rle_encode(data), function(err) {
            if (err) return console.log(err);
            console.log(`${input} was encoded to ${output}`);
        })
    });
}
