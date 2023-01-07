function search(city){
    let apiKey = "61b1ac8421d64c213cde1e9b5856144a"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature)
}



function getForecast(coordinates) {
    console.log(coordinates)
    let apiKey = "fc27d3cat0oef346a51ba4fd0ca6ded3"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`
  
    axios.get(apiUrl).then(displayForecast)
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
    getForecast(response.data.coord)

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


function formatDay(timestamp) {
    console.log(timestamp)
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days =["sat", "sun", "Mon", "Teh", "Wed", "The", "Friday" ]
    return days[day];
}


function displayForecast(response) {
    console.log(response.data);

    let forecast = response.data.daily;


    let forcastElement = document.querySelector("#forcast")
   
    let forcastHtml = `<div class="row">`;
    forecast.forEach(function(forecastDay , index) {
        if (index < 6 ) {     

        forcastHtml = forcastHtml +
        `<div class="col-2">
        <div class="weather-forcast-date">
            ${formatDay(response.data.daily[index].time)}
        </div>
        <img src=${response.data.daily[index].condition.icon_url} alt="" width="42">
        <div class="weather-forcast-temperature">
            <span class="maximum">${Math.round(response.data.daily[index].temperature.maximum)}°</span>
            <span class="minimum">${Math.round(response.data.daily[index].temperature.minimum)}°</span>
        </div>
    </div>`;}
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

