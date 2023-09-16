const validator = require('validator').default;

const isEmail = validator.isEmail('cacat.cacat@cacat.com');

console.log(isEmail);
