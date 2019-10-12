const process = require('process');

class Search {
  static info() {
    return {
      time: 0,
      iterations: 0,
    }
  }
  static linear(array, x) {
    let info = this.info();
    info.time = process.hrtime();
    while((info.iterations < array.length) && (array[info.iterations] !== x)) {
      info.iterations++
    }
    info.time = process.hrtime(info.time);
    if (info.iterations === array.length) {return null}
    return {result: array[info.iterations++], info: info, array: array}
  }

  static linearBarrier(array, x) {
    let info = this.info();
    array = [...array];
    array.push(x);
    info.time = process.hrtime();
    while(array[info.iterations] !== x) {
      info.iterations++;
    }
    info.time = process.hrtime(info.time);
    if (info.iterations === array.length) {return null}
    return {result: array[info.iterations++], info: info, array: array}
  }

  static binary(array, x) {
    const sortRule = (a,b) => {
      if(a<b) return -1
      else if(a>b) return 1
      else return 0
    }
    let info = this.info();
    info.time = process.hrtime();
    array = [...array].sort(sortRule);
    let low = 0;
    let high = array.length - 1;
    while (low <= high) {
      let mid = (low + high) >> 1
      info.iterations++;
      if (x < array[mid]) {
        high = mid - 1;
      }
      else if (x > array[mid]) {
        low = mid + 1;
      }
      else {
        info.time = process.hrtime(info.time);
        --info.iterations;
        return {result: array[info.iterations++], info: info, array: array}
      }
    }
    return null
  }
}


module.exports = {Search}
