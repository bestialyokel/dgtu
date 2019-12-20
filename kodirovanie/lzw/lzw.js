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

    //result += (table.length - 1).toString().length
    result = codes.map(x => x < len ? table[x] : x + 256 - len).join('')
    result += buf
    console.log(table)
    return result
}

let lzw_decode = (text) => {
    let table = []
    let result = String()

    for (let i = 0; i < text.length; i++) 
        if (isNaN(text[i]) && !table.includes(text[i])) 
            table.push(text[i])

    let len = table.length;

    
   
        
    let buf = text[0]
    let num = String()


    for (let i = 1; i < text.length; i++) {
        if (!isNaN(text[i])) {
            num = text.slice(i, i + 3)
            text = text.slice(0, -3)

            console.log(num);

            num = String()
            
            //console.log(num);

        }
        buf += text[i]
        if (table.includes(buf)) continue 
        let code = table.indexOf(buf.slice(0, -1))
        //codes.push(code)
        table.push(buf)
        buf = buf[buf.length - 1]
    }    



    return table

    
}


let data = fs.readFileSync("input.txt")

let a = lzw_encode(data.toString())


let b = lzw_decode(a)

console.log(data.toString(), a, b)

/*if (isNaN(text[i])) {
    result += text[i]
    amount = String()
}
else {
    while( !isNaN(text[i]) ) {
        amount += text[i]
        i += 1;
    }
    console.log(amount)

}*/