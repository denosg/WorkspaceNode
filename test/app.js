const generator = require('generate-password');

const secret = generator.generate({
    length: 6,
    excludeSimilarCharacters: true,
    numbers: true,
  });

// 'uEyMTw32v9'
console.log(secret);