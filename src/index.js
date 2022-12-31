function search(city){
    let apiKey = "61b1ac8421d64c213cde1e9b5856144a"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature)
}


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
    let dateElement = document.querySelector("#time");
    dateElement.innerHTML = showTime(response.data.dt * 1000 ) ;
    let iconElement = document.querySelector("#icon")
    let currentIcon = response.data.weather[0].icon
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}@2x.png`)

}

function showTime (timestamp) {

let currentTime = new Date(timestamp);
let days = ["sunday", "Monday", "Tuesday", "Wednsday", "thursday", "Friday", "saturday"];
    let currentDay = days[currentTime.getDay()];
    let hour = currentTime.getHours();
    if (hour < 10) {
        hour = `0${hour}`
    }
    let minut = currentTime.getMinutes();
    if (minut <10) {
        minut = `0${minut}`
    }
    return `${currentDay} ${hour}:${minut}`
}


function handelSubmit(event) {
    event.preventDefault();
    let searchedCity = document.querySelector("#entered-city")
    search(searchedCity.value)



}

search("kerman");


let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);