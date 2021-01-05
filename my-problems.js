const functions = require('./my-functions');
const dateFuncs = require('./date-function')

console.log(functions.test_renamed(5, 10))
console.log(dateFuncs.addDate(4))
console.log(dateFuncs.diffCalc("1995/01/12")("2008/04/02"))

let a = {"shape": "triangle",
"color": "red",
"name":"red triangle1"}

var a = [1,2,3]
a instanceof Array //true
Array.prototype.isPrototypeOf(a) //true
a.constructur === Array //true

console.log()