const promiseFunciton = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([2, 3, 4])
        reject('something went wrong')

    }, 2000)
})

promiseFunciton.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})