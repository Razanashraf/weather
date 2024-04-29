//~ HTML ELEMENTS
var findLocation = document.querySelector(".find-input");
var todayCard = document.querySelector(".today")
var tomorrowCard = document.querySelector(".tomorrow")
var afterTomorrowCard = document.querySelector(".after-tomorrow")

//~ VARIABLES
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//~ FUNCTIONS 
async function getWeather(country) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fbf496a3090d43e5961170004241104&q=${country}&days=3`);
    var data = await response.json();
    console.log(data);
    displayWeatherToday( data.current,data.forecast.forecastday, data.location)
    displayWeatherTomorrow(data.forecast.forecastday)
    displayWeatherAfterTomorrow(data.forecast.forecastday)
}
getWeather("Cairo")
findLocation.addEventListener("keyup", function () {
    todayCard.innerHTML = ``;
    tomorrowCard.innerHTML = ``;
    afterTomorrowCard.innerHTML = ``;
    getWeather(findLocation.value)
})


function displayWeatherToday( objZero, arr, obj) {
    const dateInToday = new Date(arr[0].date)
    var dayToday = daysOfWeek[dateInToday.getDay()]
    todayCard.innerHTML += `
         <div class="weather-card-header d-flex justify-content-between px-2 py-2">
                <div class="day text-white h6">${dayToday}</div>
             <div class="day-in-number text-white h6">${arr[0].date}</div>
         </div>
             <div class="weather-card-content ps-2">
                 <div class="region text-secondary px-2 pb-2 pt-4 fs-5">
                     ${obj.name}
                 </div>
                 <div class="degrees degree-today text-white px-2 pb-4 fw-bold d-flex">
                   <div class="me-5">  ${objZero.temp_c} <sup>o</sup>C </div> 
                   <div class = "iconToday">  <img src= "https:${objZero.condition.icon}"></div>
                 </div>
                 <div class="condition  px-2 pb-4">${objZero.condition.text}</div>
                 <div class="footer-card px-2">
                     <span class="text-secondary pe-3">
                     <i class="fa-solid fa-wind"></i>
                     ${objZero.wind_kph}%
                     </span>
                 <span class="text-secondary px-2">
                 <i class="fa-regular fa-compass"></i>
                 ${objZero.wind_dir}
                 </span>
                 <span class="text-secondary px-2">
                 <i class="fa-solid fa-umbrella"></i>
                 ${objZero.humidity}%
                 </span>
             </div>
             </div>
`
}
function displayWeatherTomorrow(arr) {
    const dateInTomorrow = new Date(arr[1].date);
    var tomorrowDay = daysOfWeek[dateInTomorrow.getDay()];
    tomorrowCard.innerHTML += `
     <div class="weather-card-header-middle px-2 py-2 text-center">
    <div class="day text-white h6">${tomorrowDay}</div>
    </div>
    <div class="weather-card-content-two h-100 d-flex flex-column align-items-center">
    <div class="iconTomorrow"><img src="https:${arr[1].day.condition.icon}"></div>
    <div class="degrees text-white px-2 fs-4 fw-bold">
    ${arr[1].day.maxtemp_c}  <sup>o</sup>C
    </div>
    <div class="degrees-night text-secondary px-2  pb-4">
    ${arr[1].day.mintemp_c}  <sup>o</sup>C
    </div>
    <div class="condition  px-2">${arr[1].day.condition.text}</div>
    </div>`
    console.log(arr[1].day.condition.icon);
}

function displayWeatherAfterTomorrow(arr) {
    const dateInAfterTomorrow = new Date(arr[2].date)
    var afterTomorrowDay = daysOfWeek[dateInAfterTomorrow.getDay()];
    afterTomorrowCard.innerHTML += `
    <div class="weather-card-header-right px-2 py-2 text-center">
    <div class="day text-white h6">${afterTomorrowDay}</div>
    </div>
    <div class="weather-card-content-two h-100 d-flex flex-column align-items-center">
    <div class="iconTomorrow"> <img src="https:${arr[2].day.condition.icon}">  </div>
    <div class="degrees text-white px-2 fs-4 fw-bold">
    ${arr[2].day.maxtemp_c}  <sup>o</sup>C
    </div>
    <div class="degrees-night text-secondary px-2 pb-4">
    ${arr[2].day.mintemp_c}  <sup>o</sup>C
    </div>
    <div class="condition  px-2">${arr[2].day.condition.text}</div>
    </div>
    `
}
