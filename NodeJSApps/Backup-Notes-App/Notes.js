const fs =require('fs');
const firstName = () => {
    return "Sunil Kumar"
}
const lastName = () => {
    return "Maurya"
}
const age = "43";

const getName = () => {
    return 'Jim';
};

const getLocation = () => {
    return 'Munich';
};

const dateOfBirth = '12.01.1982';

const add =(param1,param2)=>{
    return param1+param2;
}

const jsonData=()=>{
    const data =fs.readFileSync('Book.json');
    return data.toString()
}

/*
exports.fname = firstName();
exports.lname = lastName();
exports.age = age;
exports.getName = getName;
exports.getLocation = getLocation;
exports.dob = dateOfBirth;*/

module.exports = {
    fname: firstName(),
    lname: lastName(),
    age: age,
    getName: getName,
    getLocation: getLocation,
    dob: dateOfBirth,
    add:add,
    jsonData:jsonData()
}