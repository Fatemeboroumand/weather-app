let apiKey = "61b1ac8421d64c213cde1e9b5856144a"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=kerman&appid=${apiKey}&units=metric`

function displayTemperature(response) {
    let city = document.querySelector("#city")
    city.innerHTML = response.data.name
    let temperatureElement =document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    console.log(response.data)
    let weatherDiscription = document.querySelector("#weather-discribtion")
    weatherDiscription.innerHTML =response.data.weather[0].description
    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = Math.round(response.data.main.humidity)
    let wind = document.querySelector("#wind")
    wind.innerHTML = Math.round(response.data.wind.speed)

}
axios.get(apiUrl).then(displayTemperature)


