const sum = (a, b) => {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Number should be not less then 0')
            }
            resolve(a + b)
        }, 2000)
    }))
}

const doWork = async () => {
    const sumNegative = await sum(-2, 3)
    console.log('-------------- sumNegative-----------', sumNegative)
    const sum1 = await sum(2, 3)
    console.log('-------------- Sum1-----------', sum1)
    const sum2 = await sum(sum1, 5)
    console.log('-------------- Sum2-----------', sum2)
    const sum3 = await sum(sum2, 15)
    console.log('-------------- Sum3-----------', sum3)
}

doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log('Error: ', error)
})