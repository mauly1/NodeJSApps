require('../src/db/mongoose')
const User = require('../src/models/User')

// ----------- First way of promise chaining--------------
/*
User.findByIdAndUpdate('5febd7c846eab71016d25670', {age: 27}).then((user) => {
    console.log('------>>> first then response')
    console.log(user);
    return User.countDocuments({age: 27})
}).then((response) => {
    console.log('------------------')
    console.log('------ second then response')
    console.log(response)
}).catch((e) => {
    console.log(e)
})*/

// --------- second way to perform promise with Aysnc and await-------

const upadateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return {
        user,
        count
    }
}

upadateAgeAndCount('5fec5f40ccd40f272dc7bc2b', '42').then((response) => {
    console.log(response)
}).catch((error) => {
    console.log('Error', error)
})