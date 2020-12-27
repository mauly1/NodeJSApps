const fs =require('fs')

const data=fs.readFileSync('Book.json');

console.log(data.toString());
const parseData=JSON.parse(data);
console.log(parseData);
console.log(parseData.title);
console.log(parseData.author);

parseData.title='new Title';
parseData.author='new Author';

console.log('After changes------- ',parseData);
console.log('After changes ',parseData.title);
console.log('After Changes ',parseData.author);

fs.writeFileSync('NewBook.json',JSON.stringify(parseData));


/*const Book = {
    title: 'Java',
    author: 'Teach by yourself'
}

const bookJson = JSON.stringify(Book);
fs.writeFileSync('Book.json',bookJson);*/
/*
console.log('Json Data',bookJson);

console.log('Json Data',bookJson);

const parseData=JSON.parse(bookJson);
console.log('parseData ',parseData)
console.log('parseData title',parseData.title)
console.log('parseData author ',parseData.author)
console.log('---------------------')
console.log('Book ',Book)
console.log('Book title',Book.title)
console.log('Book author ',Book.author)*/
