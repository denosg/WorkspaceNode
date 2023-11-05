console.log('Client side js file loaded')

// Get the latitude and longitude input elements by their IDs
const latitudeInput = document.getElementById("latitudeInput");
const longitudeInput = document.getElementById("longitudeInput");

// Get the search button element by its ID
const searchButton = document.getElementById("searchButton");

const messageOne = document.getElementById("messageOne")
const messageTwo = document.getElementById("messageTwo")

// messageOne.textContent = 'sex'

searchButton.addEventListener("click", (event) => {
    event.preventDefault()

    // Get the values of latitude and longitude input elements
    const latitudeValue = latitudeInput.value;
    const longitudeValue = longitudeInput.value;

    console.log(latitudeValue)
    console.log(longitudeValue)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?latitude=${latitudeValue}&longitude=${longitudeValue}`).then((response) => {
        response.json().then(({ error, address }) => {
            messageOne.textContent = ''
            if (error) {
                messageTwo.textContent = error
                return console.log(error);
            }
            console.log(address.location.country)
            messageTwo.textContent = address.location.country
        })
    })
})