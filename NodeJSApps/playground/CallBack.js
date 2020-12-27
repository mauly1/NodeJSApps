/*
setTimeout(() => {
    console.log('Service Call')
}, 2000)

const names = ['sunil', 'amit', 'akif'];
const nameInBold = names.filter((name) => {
    return name.length <= 4;
})

const getCode = (address, callback) => {

    setTimeout(() => {
        const data = {
            longitude: 12.301,
            latitude: 122.45
        }
        callback(data)
    }, 2000)/!**!/

}

console.log(nameInBold)

getCode('bilaspur', (response) => {
    console.log(response)
})*/

/*
const add = (param1, param2, callback) => {
    setTimeout(() => {
        const sumValue = param1 + param2;
        callback(sumValue);
    }, 2000)
}



add(12, 12, (sumValue) => {
    console.log(sumValue)
})*/


const addressDetails = (param1, param2, param3, callback) => {
    setTimeout(() => {
        let message = {
            name: param1,
            age: param2,
            address: param3
        }
        callback(message)
    }, 2000)
}
addressDetails('sunil', '42', 'PUNE', (response) => {
    console.log(JSON.stringify(response))
    console.log(`Hello Mr. ${response.name} , your age is ${response.age} , your current address is ${response.address}`)

})