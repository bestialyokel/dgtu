const fs = require('fs');


let lzw_encode = (text) => {
    let table = []
    let result = String()
    let codes = [];

    for (i in text) 
        if (table.indexOf(text[i]) == -1) 
            table.push(text[i])

    let len = table.length

    let buf = text[0]
    for (let i = 1; i < text.length; i++) {
        buf += text[i]
        if (table.includes(buf)) continue 
        let code = table.indexOf(buf.slice(0, -1))
        codes.push(code)
        table.push(buf)
        buf = buf[buf.length - 1]
    }

    result += (table.length - 1).toString().length
    codes.forEach(x => x < len ? result += table[x] : result += x.toString().padStart(2, 0))
    result += buf

    return result
}

let lzw_decode = (text) => {
    let table = []
    let result = String()
    let amount = String()

    while (!isNaN(text[0])) {
        amount += text[0]
        text = text.slice(1)
    }
    amount = Number(amount)



    for (let i = 0; i < text.length; i++) {
        let code = String()
        if (isNaN(text[i])) {
            code = text[i]
        } else {
            code = String()
            for(let j = 0; j < amount; j++) code += text[i+j]
            i++
        }
        console.log(code)
    }

    //console.log(table, text)
    
    return amount

    
}


let data = fs.readFileSync("input.txt")

let a = lzw_encode(data.toString())


let b = lzw_decode(a)

console.log(data.toString(), a ,b)