const user = require('./Notes');
const yargs =require('yargs')
console.log(
    `${user.getName()} lives in ${user.getLocation()} and was born on ${user.dob}.`
);

console.log(`User First Name is  ${user.fname} and last name is ${user.lname} and his age is ${user.age}`)

console.log(`added value of 3, 5  is ${user.add(3,5)}`)

const jsonBinaryData=user.jsonData;
const jsonFieldData=JSON.parse(jsonBinaryData);
console.log(`content of JSON file- Title is:  ${jsonFieldData.title} Author is ${jsonFieldData.author}`)