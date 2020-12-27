
console.log('i am from util js file');
const message = ' i am message variable from util.js file';
var fields = {id: 1, text: message, age: 40,email:'sunil@gmail.com'}
const add = (param1,parama2) => {
    return param1+parama2;
}
const subtract = (param1,parama2) => {
    return param1-parama2;
}
const multiplication = (param1,parama2) => {
    return param1*parama2;
}
const division = (param1,parama2) => {
    return param1%parama2;
}
module.exports = add,subtract,multiplication,division