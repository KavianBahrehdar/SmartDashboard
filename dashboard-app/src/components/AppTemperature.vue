<script lang="ts">
import axios from 'axios'
import { Chart } from 'chart.js/auto'
import { ref, onMounted } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement)
export default {
  setup () {
    const temperature = ref<number>()
    const time = ref<string[]>()
    const userId = ref<string>()
    const weatherURI = ref<string>()
    const stromURI = ref<string>()
    // get the logged in user id to show the setting for that user
    async function getUserId () {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get('http://localhost:3000/api/users/profile')
        userId.value = response.data.id
        getURI()
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // get the setting for that user id
    async function getURI () {
      try {
        axios.defaults.withCredentials = true
        const responseSetting = await axios.get(`http://localhost:3000/api/setting/getsetting/${userId.value}`)
        // router.push('/')
        weatherURI.value = responseSetting.data.weatherURI
        stromURI.value = responseSetting.data.stromURI
        console.log(weatherURI.value)
        fetchTemperature()
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // get the temperature from the uri setting
    async function fetchTemperature () {
      try {
        axios.defaults.withCredentials = false
        const response = await axios.get(`${weatherURI.value}`)
        time.value = (response.data.timestamp).slice(11, 16)
        temperature.value = (response.data.temperature)
      } catch (error) {
        console.log('upps ', error)
      }
    }
    // draw a chart for temperature and time
    function temperatureChart () {
      const myChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: [time.value],
          datasets: [{
            label: 'Temperature',
            data: [temperature.value],
            borderColor: 'blue',
            // borderColor: 'red',
            backgroundColor: 'blue',
            pointBackgroundColor: 'blue',
            pointBorderColor: 'blue',
            pointHoverBackgroundColor: 'blue',
            tension: 0.2,
            borderWidth: 2
          }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: '#ecf0f1'
              },
              ticks: {
                color: '#7f8c8d'
              }
            },
            x: {
              beginAtZero: false,
              grid: {
                color: '#ecf0f1'
              },
              ticks: {
                color: '#7f8c8d'
              }
            }
          }
        }
      })
      setInterval(() => {
        myChart.data.datasets[0].data.push(temperature.value)
        myChart.data.labels?.push(time.value)
        myChart.update()
      }, 30000)
    }
    onMounted(() => {
      getUserId()
      setInterval(() => {
        fetchTemperature()
      }, 30000)
      temperatureChart()
    })
    return {
    }
  }
}
</script>
<template>
  <div class="chart-container">
    <canvas id="myChart"></canvas>
  </div>
</template>
<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 450px;
  box-sizing: border-box;
}

canvas {
  width: 100%;
  max-width: 600px; /* Optional: Set a max width if you want */
  height: auto;
}
</style>
