<script lang="ts">
import axios from 'axios'
import { Chart } from 'chart.js/auto'
import { Line } from 'vue-chartjs'
import { ref, onMounted } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement)
export default {
  // name: 'BarChart',
  // type: 'line',
  // components: { Line },
  setup () {
    const humidity = ref<number>()
    const temperature = ref<number>()
    const time = ref<string[]>()
    const userId = ref<string>()
    const weatherURI = ref<string>()
    const stromURI = ref<string>()
    // get the logged in user id
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
    // get the uri for logged in user
    async function getURI () {
      try {
        axios.defaults.withCredentials = true
        const responseSetting = await axios.get(`http://localhost:3000/api/setting/getsetting/${userId.value}`)
        // router.push('/')
        weatherURI.value = responseSetting.data.weatherURI
        stromURI.value = responseSetting.data.voltage
        console.log(stromURI.value)
        fetchHumidity()
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // get the humidity from the uri of the logged in user
    async function fetchHumidity () {
      try {
        axios.defaults.withCredentials = false
        const response = await axios.get(`${weatherURI.value}`)
        humidity.value = response.data.humidity
        time.value = (response.data.timestamp).slice(11, 16)
        temperature.value = (response.data.temperature - 32) * 5 / 9
      } catch (error) {
        console.log('upps ', error)
      }
    }
    // draw a chart for humidity and time
    function humidityChart () {
      const myChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: [time.value],
          datasets: [{
            label: 'Humidity',
            data: [humidity.value],
            borderColor: 'red',
            // borderColor: 'red',
            backgroundColor: 'red',
            pointBackgroundColor: 'red',
            pointBorderColor: 'red',
            pointHoverBackgroundColor: 'red',
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
        myChart.data.datasets[0].data.push(humidity.value)
        // myChart.data.datasets[1].data.push(temperature.value)
        myChart.data.labels?.push(time.value)
        myChart.update()
      }, 30000)
      // myChart.data.labels?.push(response.data.timestamp)
    }
    onMounted(() => {
      getUserId()
      // fetchHumidity()
      setInterval(() => {
        fetchHumidity()
      }, 30000)
      humidityChart()
    })
    return {
      humidity
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
