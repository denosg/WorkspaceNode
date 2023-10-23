const request = require('postman-request');

const url = "http://api.weatherstack.com/current?access_key=fa98b303693cffb56cd68ce189f65b07&query=37.8267,-122.4233&units=f";

request({ url: url, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service !');
    } else if (response.body.error) {
        console.log('Unable to find location');
    } else {
        const data = response.body;
        console.log(`It is currently: ${data.current.temperature}. It feels like ${data.current.feelslike} degrees out.`);
    }
});

//Geocoding
//Address -> lat/lng -> weather