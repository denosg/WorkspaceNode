const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fa98b303693cffb56cd68ce189f65b07&query=${longitude},${latitude}&units=f`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = response.body;
            callback(undefined, data);
        }
    });
};

module.exports = {
    forecast: forecast
}