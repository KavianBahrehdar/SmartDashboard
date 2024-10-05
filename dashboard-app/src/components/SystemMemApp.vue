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
    const freeRam = ref<number>()
    const totalRam = ref<number>()
    const usedRam = ref<number>()
    // function to get system memory information
    async function getMem () {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get('http://localhost:3000/api/system/memory')
        freeRam.value = response.data.free
        usedRam.value = response.data.used
        totalRam.value = response.data.total
        console.log(totalRam.value)
        memChart()
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // function to draw a chart for system memory
    function memChart () {
      const myChart = new Chart('Chart', {
        type: 'doughnut',
        data: {
          labels: ['freeRam', 'usedRam'],
          datasets: [{
            label: 'RAM',
            data: [freeRam.value, usedRam.value],
            borderColor: '#313131',
            // borderColor: 'red',
            backgroundColor: [
              '#1A4273',
              'white'
            ],
            hoverOffset: 50
          }
          ]
        }
      })
      // myChart.data.labels?.push(response.data.timestamp)
    }
    onMounted(() => {
      getMem()
      // fetchHumidity()
      // setInterval(() => {
      //   getMem()
      // }, 600000)
      // memChart()
    })
    return {
    }
  }
}
</script>
<template>
  <div class="chart-container">
    <canvas id="Chart"></canvas>
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
