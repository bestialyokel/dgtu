const table = {
    "]" : "[",
    ")" : "(",
    "}" : "{",
}

var isValid = function(s) {
    let stack = []
    for (const char of s) {
        if (stack.length == 0 || stack[stack.length - 1] != table[char]) 
            stack.push(char)
        else
            stack.pop()    
    }
    return stack.length == 0
};


let x = isValid("[](){}")