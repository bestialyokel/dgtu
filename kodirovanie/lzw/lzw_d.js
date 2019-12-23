const fs = require('fs');

let [input, output] = [process.argv[2], process.argv[3]]

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
            num = Number(num)
            for(let j = 0; j < table[num - 256 + len].length; j++) {
                buf += table[num - 256 + len][j]
                if (table.includes(buf)) continue
                let code = table.indexOf(buf.slice(0, -1))
                result += table[code];
                table.push(buf)
                buf = buf[buf.length - 1]
            }
            i+=2;
            num = String()
            continue
        }
        buf += text[i]
        if (table.includes(buf)) continue 
        let code = table.indexOf(buf.slice(0, -1))
        result += table[code]
        table.push(buf)
        buf = buf[buf.length - 1]
    } 
    result += text[text.length - 1]   
    return result 
}

let data = fs.readFileSync(input).toString();

fs.writeFileSync(output, lzw_decode(data));