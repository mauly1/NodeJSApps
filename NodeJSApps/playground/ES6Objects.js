const product = {
    label: 'New product',
    price: 100,
    sellingprice: 30,
    comment: 'used for external use',
    rating: 4.2
}
// option 1: direct access variable from array
const {label, comment} = product
/*console.log(label);
console.log(comment);*/

// option 2 change the name of the variable at run time

const {label: productLabel, price, rating = 5} = product
/*console.log(productLabel);
console.log(price);
console.log(rating)*/

const transaction = (type, {label, sellingprice=0, rating=5}={}) => {
    console.log(`product name is ${type} and its ${label} , selling price is ${sellingprice} and its ratting is ${rating}`)
}
console.log('--------------------------------')
transaction('Myproduct');
console.log('--------------------------------')
transaction('Myproduct', product);