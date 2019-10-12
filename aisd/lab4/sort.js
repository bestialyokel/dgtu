const process = require('process');

class Sort {
  static info() {
    return {
      time: 0,
      iterations: 0,
      comparsions: 0,
      changes: 0
    }
  }
  static swap(a, needInf) {
    a = a.slice();
    let info = this.info();
    let variable;

    if (needInf) {
      let b = a.slice()
       for(let j = 0; j < b.length - 1; j++) {
          for(let i = 0; i < b.length - j; i++ ) {
            if (b[i] > b[i+1]) {
              variable = b[i];
              b[i] = b[i+1];
              b[i+1] = variable;
              info.changes++
            }
            info.comparsions++
            info.iterations++
          }
          if (info.changes == 0) {
            break;
          }
        }
    }
    info.time = process.hrtime(); //start
    for(let j = 0; j < a.length - 1; j++) {
      let changes = 0;
      for(let i = 0; i < a.length - j; i++ ) {
        if (a[i] > a[i+1]) {
          variable = a[i];
          a[i] = a[i+1];
          a[i+1] = variable;
          changes++
        }
      }
      if (changes == 0) {
        info.time = process.hrtime(info.time) //end sorted
        return {array: a, info: needInf ? info : null, name: 'swap'}
      }
    }
    info.time = info.time = process.hrtime(info.time) // end
    return {name: 'swap', array: a, info: needInf ? info : null, name: 'swap',}
  }
  static inclusion(a, needInf) {
    a = a.slice();
    let info = this.info();
    if (needInf) {
       let b = a.slice()
       for(let i = 0; i < b.length - 2; i++) {
         let key = b[i]
         let j = i -1
          while ((key < b[j]) && (j>=0)) {
            b[j+1] = b[j]
            j--
            info.comparsions+=2;
            info.iterations++;
          }
          b[j+1] = key;
          info.changes++
       }
     }

    info.time = process.hrtime(); //start
    for(let j = 2; j < a.length; j++) {
      let key = a[j]
      let i = j - 1
      while (i >= 0 && a[i] > key) {
        a[i+1] = a[i]
        i--;
      }
      a[i+1] = key;
    }
    info.time = process.hrtime(info.time);
    return {array: a, info: needInf ? info : null, name: 'inclusions'}
  }
  static bubble(a, needInf) {
    a = a.slice();
    let info = this.info();

    if (needInf) {
        let b = a.slice()
        for(let i = 0; i < b.length - 1; i++) {
          let x = b[i]
          let k = i
          for(let j = i + 1; j < b.length; j++) {
            info.comparsions++
            info.iterations++
            if (b[j] < x) {
              k = j
              x = b[j]
              info.changes++
            }
          }
          b[k] = b[i]
          b[i] = x
        }
    }
    info.time = process.hrtime();
    for(let i = 0; i < a.length - 1; i++) {
      let x = a[i]
      let k = i
      for(let j = i + 1; j < a.length; j++) {
        if (a[j] < x) {
          k = j
          x = a[j]
        }
      }
      a[k] = a[i]
      a[i] = x
    }
    info.time = process.hrtime(info.time)
    return {array: a, info: needInf ? info : null, name: 'bubble'}
  }
  static quick(arr, needInf) {
    arr = arr.slice();
    const qsort = a => {
      if (a.length == 0) return []
      let pivot = a[0]; a.shift();
      let lesser = qsort(a.filter(x => x<pivot));
      let greater = qsort(a.filter(x => x>=pivot));
      return lesser.concat(pivot).concat(greater)
    }
    let info = this.info();
    info.time = process.hrtime();//start
    arr = qsort(arr);
    info.time = process.hrtime(info.time)//end;
    return {array: arr, info: needInf ? info : null, name: 'quick'}
  }
}

module.exports = {
  Sort: Sort
}
