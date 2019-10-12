let H = (string, length) => {
  let num = 0
  for (let char of string) num += char.charCodeAt(0)
  return num % length
}

class L {
  constructor(hash, number) {
    this.inf = hash
    this.number = number
  }
  toString() {
    return this.inf
  }
}

let my_H = string => {
  let hash = 1
  for(let i = 0, length = string.length; i < length; i++) {
    let code = ((string.charCodeAt(i) * i) << i) + i

    if (i%1) hash |= code + string.charCodeAt(i)
    else hash += code
  }
  return Math.abs(hash)
}

class HTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill([])
  }
  add(key, number) {
    let h = H(key, this.size)
    console.log(h)
    this.table[h].push(new L(my_H(key), number))
  }
  search(key) {
    let h = H(key)
    let el = my_H(key)
    let i = this.table[h].findIndex(x => x.inf == el)
    return this.table[h][i]
  }
}

console.log(my_H('abab'),my_H('aabb'),my_H('aaac'),my_H('caaa'),my_H('bbaa'))
