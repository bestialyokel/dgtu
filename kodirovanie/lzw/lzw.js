const fs = require('fs');


let lzw_encode = (text) => {
    let codes = []
    let table = []
    let result = String()
    let len = 0

    //fill table 
    for (i in text) 
        if (table.indexOf(text[i]) == -1) 
            table.push(text[i])

    len = table.length
    //build table & code
    let buf = text[0]
    for (let i = 1; i < text.length; i++) {
        buf += text[i]
        if (table.includes(buf)) continue
        let code = table.indexOf(buf.slice(0, -1))
        codes.push(code)
        console.log(buf, code)
        table.push(buf)
        buf = buf[buf.length - 1]
    }
    codes.push(table.indexOf(buf))



    return {codes, table: table.slice(0, len)}
}


let data = fs.readFileSync("input.txt")

let a = lzw_encode(data.toString())
console.log(data.toString())
console.log(a)