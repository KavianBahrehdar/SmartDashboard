<template>
    <div class="body">
        <main>
            <div class="search-box">
                <input type="text"
                class="search-bar"
                placeholder="Search ...."
                v-model="selectedCity"
                @keypress="fetchWeather"
                />
            </div>
            <div class="location-box">
              <div class="location">{{city_name}}</div>
            </div>
            <div class="row">
              <div v-for="(main, index) in main" :key="main">
                <div class="weather-wrap" v-if="typeof main != 'undefined'">
                      <div class="location-box">
                          <div class="location">{{dt_txt[index]}}</div>
                      </div>
                      <div class="weather-box">
                          <div class="tmp">{{ Math.round (temp[index])}}°C</div>
                          <div class="weather">{{weather[index]}}</div>
                      </div>
                </div>
              </div>
            </div>
        </main>
    </div>
</template>

<!-- <script lang="ts">
import axios from 'axios'

export default {
  data () {
    return {
      selectedCity: '',
      forecast: {},
      temp: {},
      dt_txt: {},
      weather: {},
      main: {},
      city_name: '',
      error: false
    }
  },
  methods: {
    async fetchWeather (e: KeyboardEvent) {
      try {
        if (e.key === 'Enter' || e.key === 'Space') {
          const response = await axios.get('http://localhost:3000/forecast/Deggendorf')
          this.forecast = response.data
          this.city_name = this.forecast.city.name
          console.log(this.forecast.list.length)
          for (let i = 0; i < this.forecast.list.length; i++) {
            this.main[i] = this.forecast.list[i].main
            this.temp[i] = this.forecast.list[i].main.temp
            this.dt_txt[i] = this.forecast.list[i].dt_txt
            this.weather[i] = this.forecast.list[i].weather[0].main
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script> -->
<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#body{
  /* background-image: url('../assets/cold-bg.jpg'); */
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
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date{
    color: white;
    font-size: 15px;
    font-weight: 300;
    font-style: italic;
    /* text-align: center; */
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.weather {
    text-align: center;
}
.weather-box .tmp {
    display: inline-block;
    padding: 15px 15px;
    color: white;
    font-size: 8px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 16px;
    margin: 30px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
    color: #FFF;
    font-size: 15px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
