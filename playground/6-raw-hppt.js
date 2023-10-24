const http = require('http');

const url = "http://api.weatherstack.com/current?access_key=fa98b303693cffb56cd68ce189f65b07&query=45,-75&units=f"
const request = http.request(url, (reponse) => {
    
    let data = ''

    reponse.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    reponse.on('end', () => {
        const body = JSON.parse(data);
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log(`error: ${error}`)
})

request.end()