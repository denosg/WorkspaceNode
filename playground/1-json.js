const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
// }

// const bookJson = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJson);
// console.log('File Overrwritten');

// const parsedBook = JSON.parse(bookJson);
// console.log(parsedBook.author);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJson = dataBuffer.toString();
// const data = JSON.parse(dataJson);
// console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);

data.name = 'Denis';
data.age = 20;

fs.writeFileSync('1-json.json', JSON.stringify(data));
