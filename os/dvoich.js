let m = 256;
let b = 4;

let clp2 = (x) => {
    x = x - 1;
    x = x | (x >> 1);
    x = x | (x >> 2);
    x = x | (x >> 4);
    x = x | (x >> 8);
    x = x | (x >> 16);
    return x + 1;
}

let memory = Array(m).fill(0);

let bitmap = Array(m/b).fill(0); //bitmap 

let lists = Array( Math.log2(m/b) + 1 ).fill().map( (x,i) => Array(Math.pow(2, i)).fill(0) );

lists[0][0] = 1;


let find = (level) => {
    for (let i = 0; i < 1 << level; i++) {
        let index = i * (1 << level);
        if (lists[level] == 1 && isFree(index, 1 << level)) return i
    }
    return -1;
}

let isFree = (index, size) => {
    for (let i = 0; i < size; i++)
        if (bitmap[i+index] == 1) return false
    return true
}

let spreadTo = (level, from = 0, size = 1) => {

    if (from == level) return

    let list = lists[from];

    for(let i = 0; i < list.length; i++)
        if (list[i] == 1) {
            list[i] = 0;
            lists[from + 1][i*2] = lists[from + 1][i*2 + 1] = 1 //заполнение 
            break
        }
    spreadTo(level, from + 1, size*2)
}

let alloc = (size) => {
    let address = -1;
    size = size>b ? clp2(size) : b;
    
    let level = 0;

    while(size << level < m) level++

    address = find(level);

    if (address == -1) 

    console.log(v);
}

//spreadTo(6);
spreadTo(5);

console.log(lists.map(x => x.join('')))