<template>
    <div class="container" id="wrapper">
  <div class="container-fluid" id="current-weather">
    <div class="row">
      <!-- Right panel -->
      <div class="col-md-4 col-sm-5">
        <h5><spam id="cityName">{{ cityName }}</spam>, <spam id="cityCode">{{ cityCode }}</spam></h5>
        <h6 id="localDate">{{ localDate }}</h6>
        <h5 id="localTime">{{ localTime }}</h5>
        <button id="refreshButton" @click="getClientPosition" style="background-color: transparent; color: white;"><i class="fa fa-refresh fa-fw fa-spin" aria-hidden="true"></i> Refresh</Button>
      </div>
      <!-- Center panel -->
      <div class="col-md-5 col-sm-7" style="margin: 10px auto;padding:0;">
        <div class="row">
          <i :class="weatherIconsMap[icon]" id ="main-icon" style="font-size: 85px;"></i>
          <div>
            <spam id="mainTemperature">{{ Math.round (mainWeather.temp) }}</spam>
            <p id="tempDescription">{{ weather }}</p>
          </div>
          <p style="font-size: 1.5rem;">°C</p>
        </div>
      </div>
      <!-- Left panel -->
      <div class="col-xs-12 col-sm-12 col-md-3 row" style="text-align: right;">
        <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
          <h6>Humidity: <spam id="humidity">{{ Math.round (mainWeather.humidity) }}</spam>%</h6>
        </div>
        <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
          <h6>Wind: <spam id="wind">{{ windWeather.speed }}</spam> m/s</h6>
        </div>
        <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
          <h6>High: <spam id="mainTempHot">{{ Math.round (mainWeather.temp_min) }}</spam>°</h6>
        </div>
        <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
          <h6>Low: <spam id="mainTempLow">{{ Math.round (mainWeather.temp_max) }}</spam>°</h6>
        </div>
      </div>
    </div>
  </div>
  <!-- 4 days forecast -->
  <div class="container-fluid">
    <div class="row" style="padding: 2px;">
      <!-- Day 1 -->
      <div class="col-md-3 col-sm-6 day-weather-box">
        <div class="col-sm-12 day-weather-inner-box">
          <div class="col-sm-8 forecast-main">
            <p id="forecast-day-1-name"></p>
            <div class="row">
              <h5 id="forecast-day-1-main">{{Math.round (dayOne.temp) }} °</h5>
              <i :class="weatherIconsMap[dayOneIcon]" id="forecast-day-1-icon"></i>
            </div>
          </div>
          <div class="col-sm-4 forecast-min-low">
            <p><spam class="high-temperature" id="forecast-day-1-ht">{{Math.round (dayOne.temp_min)}}</spam>°</p>
            <p><spam class="low-temperature" id="forecast-day-1-lt">{{Math.round (dayOne.temp_max)}}</spam>°</p>
          </div>
        </div>
      </div>
      <!-- Day 2 -->
      <div class="col-md-3 col-sm-6 day-weather-box">
        <div class="col-sm-12 day-weather-inner-box">
          <div class="col-sm-8 forecast-main">
            <p id="forecast-day-2-name"></p>
            <div class="row">
              <h5 id="forecast-day-2-main">{{Math.round (dayTwo.temp) }} °</h5>
              <i :class="weatherIconsMap[dayTwoIcon]" id="forecast-day-2-icon"></i>
            </div>
          </div>
          <div class="col-sm-4 forecast-min-low">
            <p><spam class="high-temperature" id="forecast-day-2-ht">{{Math.round (dayTwo.temp_min) }}</spam>°</p>
            <p><spam class="low-temperature" id="forecast-day-2-lt">{{Math.round (dayTwo.temp_max) }}</spam>°</p>
          </div>
        </div>
      </div>
      <!-- Day 3 -->
      <div class="col-md-3 col-sm-6 day-weather-box">
        <div class="col-sm-12 day-weather-inner-box">
          <div class="col-sm-8 forecast-main">
            <p id="forecast-day-3-name"></p>
            <div class="row">
              <h5 id="forecast-day-3-main">{{Math.round (dayThree.temp) }} °</h5>
              <i :class="weatherIconsMap[dayThreeIcon]" id="forecast-day-3-icon"></i>
            </div>
          </div>
          <div class="col-sm-4 forecast-min-low">
            <p><spam class="high-temperature" id="forecast-day-3-ht">{{Math.round (dayThree.temp_min) }}</spam>°</p>
            <p><spam class="low-temperature" id="forecast-day-3-lt">{{Math.round (dayThree.temp_max) }}</spam>°</p>
          </div>
        </div>
      </div>
      <!-- Day 4 -->
      <div class="col-md-3 col-sm-6 day-weather-box">
        <div class="col-sm-12 day-weather-inner-box">
          <div class="col-sm-8 forecast-main">
            <p id="forecast-day-4-name"></p>
            <div class="row">
              <h5 id="forecast-day-4-main">{{Math.round (dayFour.temp) }} °</h5>
              <i :class="weatherIconsMap[dayFourIcon]" id="forecast-day-4-icon"></i>
            </div>
          </div>
          <div class="col-sm-4 forecast-min-low">
            <p><spam class="high-temperature" id="forecast-day-4-ht">{{Math.round (dayFour.temp_min) }}</spam>°</p>
            <p><spam class="low-temperature" id="forecast-day-4-lt">{{Math.round (dayFour.temp_max) }}</spam>°</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  // map the wheater information with the specific icon to show the weather in icon
  setup () {
    const weatherIconsMap = {
      '01d': 'fas fa-sun fa-2x',
      '01n': 'fas fa-moon fa-2x',
      '02d': 'fas fa-cloud-sun fa-2x',
      '02n': 'fas fa-cloud-moon fa-2x',
      '03d': 'fas fa-cloud fa-2x',
      '03n': 'fas fa-cloud fa-2x',
      '04d': 'fas fa-cloud fa-2x',
      '04n': 'fas fa-cloud fa-2x',
      '09d': 'fas fa-cloud-showers-heavy fa-2x',
      '09n': 'fas fa-cloud-showers-heavy fa-2x',
      '10d': 'fas fas fa-cloud-rain fa-2x',
      '10n': 'fas fas fa-cloud-rain fa-2x',
      '11d': 'fas fa-bolt-lightning fa-2x',
      '11n': 'fas fa-bolt-lightning fa-2x',
      '13d': 'far fa-snowflake fa-2x',
      '13n': 'far fa-snowflake fa-2x',
      '50d': 'fas fa-smog fa-2x',
      '50n': 'fas fa-smog fa-2x'
    }
    const localTime = ref<string>('')
    const localDate = ref<string>('')
    // show the time
    const startClock = () => {
      setInterval(() => {
        localTime.value = new Date().toLocaleTimeString()
      }, 1000)
      setInterval(() => {
        localDate.value = new Date().toLocaleDateString()
      }, 1000)
    }
    const cityName = ref<string>('')
    const cityCode = ref<string>('')
    // function to get the position of the user with ip and show the weather for the position
    // i will set the default to deggendorf because this website for location has a limit range of reqeust
    async function getClientPosition () {
      try {
        // const response = await axios.get('http://localhost:3000/location')
        // const position = response.data
        // cityName.value = position.city
        // cityCode.value = position.country
        fetchWeather(48.8439, 12.958)
        fetchForecast(48.8439, 12.958)
      } catch (error) {
        console.log('Uuupss', error)
      }
    }
    const weather = ref({})
    const icon = ref()
    const mainWeather = ref({})
    const windWeather = ref({})
    // fetch the today weather
    async function fetchWeather (latitude: number, longitude: number) {
      try {
        const response = await axios.get(`http://localhost:3000/weather/${latitude}/${longitude}`)
        weather.value = response.data.weather[0].description
        console.log(weather.value)
        icon.value = response.data.weather[0].icon.replace(/^"(.*)"$/, "'$1'") // change the icon value between "" to ''
        console.log(icon)
        mainWeather.value = response.data.main
        windWeather.value = response.data.wind
      } catch (error) {
        console.log('upps', error)
      }
    }
    const forecast = ref({})
    const dayOne = ref(0)
    const dayTwo = ref(0)
    const dayThree = ref(0)
    const dayFour = ref(0)

    const dayOneIcon = ref()
    const dayTwoIcon = ref()
    const dayThreeIcon = ref()
    const dayFourIcon = ref()
    // get the weather for 4 days
    async function fetchForecast (latitude: number, longitude: number) {
      try {
        const response = await axios.get(`http://localhost:3000/forecast/${latitude}/${longitude}`)
        forecast.value = response.data
        dayOne.value = response.data.list[8].main
        dayOneIcon.value = response.data.list[8].weather[0].icon.replace(/^"(.*)"$/, "'$1'")
        dayTwo.value = response.data.list[16].main
        dayTwoIcon.value = response.data.list[16].weather[0].icon.replace(/^"(.*)"$/, "'$1'")
        dayThree.value = response.data.list[24].main
        dayThreeIcon.value = response.data.list[24].weather[0].icon.replace(/^"(.*)"$/, "'$1'")
        dayFour.value = response.data.list[32].main
        dayFourIcon.value = response.data.list[32].weather[0].icon.replace(/^"(.*)"$/, "'$1'")
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(() => {
      startClock()
      getClientPosition()
    })

    return {
      getClientPosition,
      localDate,
      localTime,
      cityName,
      cityCode,
      weather,
      mainWeather,
      windWeather,
      icon,
      dayOne,
      dayTwo,
      dayThree,
      dayFour,
      weatherIconsMap,
      dayOneIcon,
      dayTwoIcon,
      dayThreeIcon,
      dayFourIcon
    }
  }
}
</script>
<style scoped>
@media (min-width: 992px) {
    .container, .container-lg, .container-md, .container-sm {
        max-width: 100vw;
    }
}
a {
  color: white;
  opacity: 0.6;
  text-decoration: none;
}

a:hover, a:active, a:focus{
  color: white;
  text-decoration: none;
  opacity: 1;
}

.active {
  color: white;
  text-decoration: none;
  opacity: 1;
}

body{
  background-color: none;
}

#wrapper {
  /* position: absolute; */
  /* margin-left: 2px; */
  background-color: #1A4273;
  box-shadow: 1px 5px 25px 3px #000000;
  border-radius: 15px;
  margin:15px auto;
  /* margin-left: 5px; */
  /* margin-right: 5px; */
  /* width: 60%; */
  /* max-width: 1115px; */
  /* padding: 10px; */
  color: white;
}

#current-weather{
  padding: 15px;
}

#mainTemperature{
  font-size: 7.5em;
  line-height: 0.7;
}

#tempDescription {
  margin-top: 10px;
  text-align: center;
}

.day-weather-box {
  border: 1px solid #1A4273;
  background-color: #009FE3;
  border-radius: 15px;
  height: 5em;
}

.day-weather-box p{
  margin-bottom: 0;
}

.side-weather-info {
  padding: 0px 10px;
}

.day-weather-inner-box {
  display: inline-flex;
  margin: 14px auto;
  padding: 0px 5px;
}

.forecast-main {
  padding: 0px 0px 0px 30px;
}

.forecast-icon {
  font-size: 55px;
  margin-left: 15px;
}

/* .modal-body p{
  color: #333;
} */
#forecast-day-1-main{
  font-size: 2.5em
}
#forecast-day-2-main{
  font-size: 2.5em
}
#forecast-day-3-main{
  font-size: 2.5em
}
#forecast-day-4-main{
  font-size: 2.5em
}
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#body{
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
main{
    min-height: 100vh;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
.search-box {
    width: 100%;
    margin-bottom: 30px;
}
.search-box .search-bar{
    display: block;
    width: 100%;
    padding: 10px;
    color: #313131;
    font-size: 20px;

    appearance: none;
    border:none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
}
.search-box .search-bar:focus{
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: white;
    border-radius: 16px 0px 16px 0px;

}
.location-box .location{
    color: white;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date{
    color: white;
    font-size: 15px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.weather {
    text-align: center;
}
.weather-box .tmp {
    display: inline-block;
    padding: 10px 25px;
    color: white;
    font-size: 80px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 16px;
    margin: 30px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
    color: #FFF;
    font-size: 30px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
} */
</style>
