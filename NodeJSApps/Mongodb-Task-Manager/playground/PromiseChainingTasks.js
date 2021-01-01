require('../src/db/mongoose')
const Task = require('../src/models/Task')

// ----------- First way of promise chaining--------------
//5febd7c846eab71016d25670
/*
Task.deleteOne({_id:'5feca32d67a896315cc99181'}).then((result)=>{
    console.log('------>>> first then response')
    console.log(result);
    return Task.countDocuments({completed:false})
}).then((response)=>{
    console.log('------------------')
    console.log('------ second then response')
    console.log('Completed Task False count is ',response)
}).catch((e)=>{
    console.log(e)
})

Task.deleteOne({_id:'5feca32d67a896315cc99181'}).then((result)=>{
    console.log('------------------Second Delete operations----------')
    console.log(result);
    return Task.countDocuments({completed:true})
}).then((response)=>{
    console.log('Completed Task True count is ',response)
}).catch((error)=>{console.log(error)})*/

// --------- second way to perform promise with Aysnc and await-------
const taskDeleteAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false})
    return {
        task,
        count
    }
}

taskDeleteAndCount('5fec5fbd91641827cb45bf29').then((response) => {
    console.log(response)
}).catch((error) => {
    console.log('Error', error)
})
