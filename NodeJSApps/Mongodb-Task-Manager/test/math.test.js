const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, sum} = require('../src/math')

test('Should calculate with tip', () => {
    const total = calculateTip(10, 30)
    expect(total).toBe(13)
})

test('Should calculate total with default tip value', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('should calculate temperature from 32 fahrenheit To 0 Celsius', () => {
    const convertedTemprature = fahrenheitToCelsius(32)
    expect(convertedTemprature).toBe(0)
})

test('should calculate temperature from 0 Celsius To 32 fahrenheit', () => {
    const convertedTemprature = celsiusToFahrenheit(0)
    expect(convertedTemprature).toBe(32)
})

test('should calculate temperature from fahrenheit To Celsius', () => {
    const convertedTemprature = fahrenheitToCelsius(77)
    expect(convertedTemprature).toBe(25)
})


test('should calculate temperature from Celsius To fahrenheit', () => {
    const convertedTemprature = celsiusToFahrenheit(25)
    expect(convertedTemprature).toBe(77)
})
// its look like aysnc call but jest compiler is not waiting for 2 second and its executing below code.
// that's the reason even though expect is not matching but test cases is passed

test('Async test demo', () => {
    setTimeout(() => {
        expect(1).toBe(1)
    }, 2000)

})

// wene we are passing a argument response(or any variable name) and calling that method after expect
// now Jest will understood this is async call and it will wait for 2000 ms.

test('Async test demo', (response) => {
    setTimeout(() => {
        expect(1).toBe(1)
        response()
    }, 2000)
})

test('Promise call test for Sum', (done) => {
    sum(4, 5).then((sumResponse) => {
        expect(sumResponse).toBe(9)
        done()
    })

})

// alternate and best way to test promise call related stuffs

test('promise call test with async and wait', async () => {
    const returnValue = await sum(3, 4);
    expect(returnValue).toBe(7)
})