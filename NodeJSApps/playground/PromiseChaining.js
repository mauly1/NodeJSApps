const sum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}


/*
sum(2,3).then((response)=>{
    console.log(` sum of 2 and 3 is ${response}`)
}).catch((e)=>{
    console.log(e);
})*/

// same thing for two time calls

/*sum(2,3).then((response)=>{
    console.log(` sum of 2 and 3 is ${response}`)
    sum(response,10).then((secondResponse)=>{
        console.log(` sum of ${response} and 10 is ${secondResponse}`)
    }).catch((e)=>{
        console.log(e);
    })
}).catch((e)=>{
    console.log(e);
})*/

// now below example for Promise Chaining

sum(2, 3).then((firstSum) => {
    console.log(firstSum);
    return sum(firstSum, 10)
}).then((secondSum) => {
    console.log(secondSum);
    return sum(secondSum,20)
}).then((thirdSum)=>{
    console.log(thirdSum)
}).catch((e) => {
    console.log(e);
})