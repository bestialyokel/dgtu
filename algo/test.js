/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
/**
 * @param {string} s
 * @return {boolean}
 */
/**
 * @param {string} s
 * @return {boolean}
 */

const comp = {
    "{" : "}",
    "[" : "]",
    "(" : ")",
}

var isValid = function(s) {
    let reset = -1
    
    let left = 0
    let right = s.length - 1
    
    do {

        if ((right - left) % 2 == 0)
            return false

        let tmp = s.lastIndexOf( comp[ s[left] ] )
        
        if (tmp == -1) 
            return false

        console.log(left ,right)
        
        if (tmp > reset) 
            reset = tmp + 1
        
            
        
        left += 1
        right = tmp - 1
        
        if (left >= right) {
            left = reset
            right = s.length
            reset = 0
        }
    
            
    } while (reset <= s.length)
    
    return true 
};

let s = "{{{}}}"

console.log(Array.from(s))

let x = isValid("{{{}}}")

console.log(x)