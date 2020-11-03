const fs = require('fs')
const os = require('os')
const process = require('process')
const crypto = require('crypto')
const readline = require('readline-sync')
const randomInt = (a, b) => Math.round(Math.random() * (b-a) + a)

//пути к файлам
const usersPath = './users'
const linesPath = './lines'

//число вводов фразы при регистрации 
//и максимально допустимая разница в скорости ввода
//при авторизации
const registerInputs = 4
const maxMsDiff = 2000

// считывание пользователей и строк
const users = fs.readFileSync(usersPath).toString().split(os.EOL).filter(x => !!x).map(x => x.split('/'))
const lines = fs.readFileSync(linesPath).toString().split(os.EOL).map(l => l.trim())

//Readline возвращающий ввод и время ввода в мс.
const readlineNoteTime = () => {
    let result = String()
    let start = process.hrtime()
    result = readline.question()
    let end = process.hrtime()
    //time в ms
    //[результат, время]
    return [result, (end[0] * 1000 + end[1] / 1000000)  - (start[0] * 1000 + start[1] / 1000000) ]
}


//Вспомогательная ф-я для меню
const selectMenu = (options, callbacks) => {
    try {
        options.forEach((o, i) => {
            console.log(i+1, o)
        })
        const index = readline.question()

        if (!callbacks[index - 1])
            throw "нет действия"

        callbacks[index-1]()
        return true
    } catch(e) {
        console.log(e)
        return false
    }
}

// Логика и интерфейс входа вперемешку
const EnterView = () => {
    const input = readline.question('name?')
    const [name, index, time] = users.find(([name]) => name == input) || []
    if (!name)
        throw "нет"
    const line = lines[index]
    console.log(`Нажмите ENTER и введите строку в кавычках: "${line}"`)
    readline.question()

    const [inputResult, inputTime] = readlineNoteTime()
    if (inputResult != line)
        throw "ввод не совпал"
    if (Math.abs(time - inputTime) > maxMsDiff)
        throw "скорость ввода не совпала"

    console.log(`${name} успешно вошел что-ли?`)
}

// Логика и интерфейс регистрации вперемешку
const RegisterView = () => {
    const input = readline.question('name?')
    const [name] = users.find(([name]) => name == input) || []
    if (name)
        throw "такой есть"
    const index = randomInt(0, lines.length - 1)
    const line = lines[index]
    console.log(`Нажмите ENTER и ${registerInputs} раза введите строку в кавычках: "${line}"`)
    readline.question()

    let timers = []
    for (let i = 0; i < registerInputs; i++) {
        const [inputResult, inputTime] = readlineNoteTime()
        if (inputResult != line) {
            console.log(inputResult.length, line.length)
            console.log('Ошибка ввода, нажмите ENTER и повторите попытку')
            readline.question()
            timers.pop()
            --i;
        } else {
            timers.push(inputTime)
        }
    }
    
    users.push([input, index, timers.reduce((acc, cur) => acc+cur) / registerInputs ])
    console.log('Пользователь зарегистрирован что ли?')  
}

// Сохранение результатов работы, вызывается в пункте меню "Выйти"
const SaveResults = () => {
    const data = users.map((record) => record.join('/')).join(os.EOL)
    fs.writeFileSync(usersPath, data)
}

const MainView = () => {
    const options = ['Войти', 'Создать', 'Выйти']
    const callbacks = [
        () => EnterView(),
        () => RegisterView(),
        () => {
            SaveResults()
            process.exit()
        }
    ]
    while (true)
        selectMenu(options, callbacks)
}

MainView()




/*process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  //process.stdout.write('end');
  console.log(1);
});*/

//считать Буффер, привести к строке, разбить на строки
//const lines = fs.readFileSync('./lines').toString().split(os.EOL)
//console.log(lines)


/*
const algorithm = 'aes-192-cbc';
const password = '123';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const cipher = crypto.createCipheriv(algorithm, key, iv);

const input = fs.createReadStream('./lines');
const output = fs.createWriteStream('./encryptedLines');

input.pipe(cipher).pipe(output);
*/