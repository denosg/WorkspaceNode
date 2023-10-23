const forecast = require('./utils/forecast');
// const request = require('postman-request');

// const url = "http://api.weatherstack.com/current?access_key=fa98b303693cffb56cd68ce189f65b07&query=37.8267,-122.4233&units=f";

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service !');
//     } else if (response.body.error) {
//         console.log('Unable to find location');
//     } else {
//         const data = response.body;
//         console.log(`It is currently: ${data.current.temperature}. It feels like ${data.current.feelslike} degrees out.`);
//     }
// });


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

console.log(process.argv);

forecast.forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})
//Geocoding
//Address -> lat/lng -> weather