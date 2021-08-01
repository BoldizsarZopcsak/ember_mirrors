// Display the time
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

function displayTime() {
    let time = new Date()
    let timeHours= time.getHours()
    let timeMinutes = time.getMinutes()
    let dayOfTheWeek = time.getDay()
    let date = time.getDate()
    let monthOfTheYear = time.getMonth()

    const timeHoursElement = document.getElementById('time-hours')
    const timeMinutesElement = document.getElementById('time-minutes')
    const dayOfTheWeekElement = document.getElementById('dayOfTheWeek')
    const dateElement = document.getElementById('date')
    const monthOfTheYearElement = document.getElementById('monthOfTheYear')
    
    timeHoursElement.innerText = String(timeHours).padStart(2, "0")
    timeMinutesElement.innerText = String(timeMinutes).padStart(2, "0")
    dayOfTheWeekElement.innerText = weekday[dayOfTheWeek]
    dateElement.innerText = date
    monthOfTheYearElement.innerText = month[monthOfTheYear]
}

function weatherBalloon(cityName) {
    let key = window.electron.getWeatherAPIKey();
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        const icon = data.weather[0].icon
        document.getElementById('weatherIcon').src = `../assets/icons/${icon}.png`

        const temperatureElement = document.getElementById('temperature')
        temperatureElement.innerText = Math.round(parseFloat(data.main.temp) - 273.15) + '\xB0';
    })
    .catch((err) => {
        console.error(err)
    });
}

window.addEventListener('DOMContentLoaded', () => {  
    setInterval(displayTime, 200)

    if (window.electron.getWeatherAPIKey()) {
        const city = window.electron.getWeatherAPICity() || "New York";
        document.getElementById("weather").classList.remove("removed")  // Show

        weatherBalloon(city)
        setInterval(_ => weatherBalloon(city), 300000, city)  // Update weather every 5 min (300000)
    }
})
