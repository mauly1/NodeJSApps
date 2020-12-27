const data =require('./util')
const validator =require('validator')
//const message ='Hello World !!';
const chalk =require('chalk')

console.log(data.id);
console.log(data.text);
console.log(data.age);
const isValidEmailId=validator.isEmail(data.email);
console.log(data.email, 'is valid email ',isValidEmailId?chalk.bgGreen(isValidEmailId):chalk.bgRed(isValidEmailId));
//console.log(data('sunil maurya'));

console.log('Hello Mr. ',process.argv[2]);