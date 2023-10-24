// object property shorthand

const userName = "denis";
const userAge = 20;

const user = {
    name: userName,
    age: userAge,
    location: 'Philadelphia',
}

console.log(user);

// obj destructuring

const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
}

// const label = product.label
// const stock = product.stock

const { label: productLabel, stock, rating = 5 } = product
console.log(productLabel)
console.log(stock)

const transaction = (type, { label, stock }) => {
    console.log(type);
    console.log(label)
    console.log(stock)
}

transaction('order', product)