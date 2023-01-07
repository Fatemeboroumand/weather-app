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
    selsiusTemp = response.data.main.temp

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



let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);


function changeToFarenhiet(event) {
    event.preventDefault();
    selsius.classList.remove("active");
    farenhiet.classList.add("active");
    let farenhietTemp = document.querySelector("#temperature")
    farenhietTemp.innerHTML = Math.round((selsiusTemp * 9 ) / 5 + 32)
}

function changeToSelsius(event) {
    event.preventDefault();
    farenhiet.classList.remove("active");
    selsius.classList.add("active");
    let selsiusTemperature = document.querySelector("#temperature");
    selsiusTemperature.innerHTML = Math.round(selsiusTemp)
}


function displayForcast() {
    let forcastElement = document.querySelector("#forcast")
    let days =["sat", "sun", "Mon", "Teh", "Wed", "The", "Friday" ]
    let forcastHtml = `<div class="row">`;
    days.forEach(function(day) {

        forcastHtml = forcastHtml +
        `<div class="col-2">
        <div class="weather-forcast-date">
            ${day}
        </div>
        <img src="https://ssl.gstatic.com/onebox/weather/48/sunny.png" alt="" width="42">
        <div class="weather-forcast-temperature">
            <span class="maximum">18°</span>
            <span class="minimum">12°</span>
        </div>
    </div>`;
    })

    forcastHtml= forcastHtml + `</dive>`;
    forcastElement.innerHTML = forcastHtml
    
}
let selsiusTemp = null;

let farenhiet = document.querySelector("#farenhiet");
farenhiet.addEventListener("click", changeToFarenhiet);

let selsius = document.querySelector("#selsius")
selsius.addEventListener("click", changeToSelsius);

search("kerman");
displayForcast();
