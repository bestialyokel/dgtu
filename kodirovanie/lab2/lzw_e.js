const fs = require('fs');

let [input, output] = [process.argv[2], process.argv[3]]


let lzw_encode = (text) => {
    let table = []
    let result = String()
    for (i in text) 
        if (table.indexOf(text[i]) == -1) 
            table.push(text[i])
    let len = table.length
    let buf = text[0]
    for (let i = 1; i < text.length; i++) {
        buf += text[i]
        if (table.includes(buf)) continue 
        let code = table.indexOf(buf.slice(0, -1))
        result += code < len ? table[code] : code + 256 - len
        console.log(table[code])
        table.push(buf)
        buf = buf[buf.length - 1]
    }
    result += buf;
    console.log(table)
    return result
}

let data = fs.readFileSync(input).toString();


fs.writeFileSync(output, lzw_encode(data));