var form = function(number, type) {
    var forms = {
        Y: ['год', 'года', 'лет'],
        M: ['месяц','месяца','месяцев'],
        D: ['день', 'дня', 'дней'],
        h: ['час', 'часа', 'часов'],
        m: ['минута', 'минуты', 'минут'],
        s: ['секунда', 'секунды', 'секунд']
    };
    var selected = forms[type];
    var ending = number%100;
    var word = '';
    if (ending > 10 && ending < 20) word = selected[2];
    else {
        ending %= 10;
        if (ending == 1) word = selected[0];
        if (ending > 1) word = selected[1];
        if (ending > 4 || ending == 0) word = selected[2];
    }
   return number + ' ' + word;
}

var d = new Date()
var b = new Date()
b.setDate(d.getDate() -12);
b.setHours(d.getHours() - 5)
b.setMinutes(d.getMinutes() - 24);
d = new Date(d - b)

var ff = function(ms) {
    var time = [];
    var dailyMs = 1000*60*60*24;
    var periods = { //Имена полей строго как в form, в порядке возрастания;
        D: dailyMs,
        h: dailyMs/24,
        m: dailyMs/(24*60)
    }
    for (var p in periods) {
        var amount = Math.floor(ms/periods[p]);
        if (amount > 0) time.push(form(amount, p));
        ms -= amount*periods[p];
    }
    return time
}

console.log(ff(d))

var localeTime = function(date) {
    var date = new Date(date);
    const MSK_OFFSET = -180;
    var localOffset = new Date().getTimezoneOffset();
    var offset = MSK_OFFSET - localOffset;
    date.setMinutes(date.getMinutes() + offset);
    return date;
}
let a = new Date(1566993353004);
console.log(localeTime(a).toLocaleTimeString())

let d1 = "14.08.2019 19:03";
let d2 = "14.08.2019"
var dateE = /^\d{2}\.\d{2}\.\d{4}/g;
var t = /\d/g;

let bc = d1.match(t);
console.log(bc);

var parseDate = function(dateString) {
    try {
        var newDate = new Date();
        const dateExp = /^\d{2}\.\d{2}\.\d{4}/g;
        const timeExp = /\d{2}\:\d{2}$/g;
        var dateMatch = dateString.match(dateExp);
        var timeMatch = dateString.match(timeExp);
        if (dateMatch == void(0) || dateMatch.length != 1) throw `Unexpected Date-String at '${dateString}', expected (<DD.MM.YYYY> | <DD.MM.YYYY hh:mm>)`
        var date = dateMatch[0].split('.');
        newDate.setFullYear(date[2]); 
        newDate.setMonth(date[1] - 1); // setMonth(int Num) Num=[0..11];
        newDate.setDate(date[0]);
        if (timeMatch != void(0) && timeMatch.length == 1) {
            var time = timeMatch[0].split(':');
            newDate.setMinutes(time[1]);
            newDate.setHours(time[0]);
        }
        return newDate;     
    } catch(e) {
        return new Error(e)
    }
}

b = parseDate(d1).toLocaleTimeString();
console.log(b);