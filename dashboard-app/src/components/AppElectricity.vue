<template>
    <div class="body">
      <div class="content">
        <p class="title">Electricity</p>
        <p class="value">{{ voltage }} V</p>
        <p class="value">{{ temperature }} °C</p>
      </div>
    </div>
  </template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup () {
    const userId = ref<string>()
    const voltage = ref<string>()
    const temperature = ref<string>()
    async function getUserId () {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get('http://localhost:3000/api/users/profile')
        userId.value = response.data.id
        console.log(userId.value)
        getURI()
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    async function getURI () {
      try {
        const responseSetting = await axios.get(`http://localhost:3000/api/setting/getsetting/${userId.value}`)
        // router.push('/')
        voltage.value = responseSetting.data.voltage
        temperature.value = responseSetting.data.temperature.tC
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    onMounted(() => {
      getUserId()
    })
    return {
      getUserId,
      getURI,
      voltage,
      temperature
    }
  }
}
</script>
<style scoped>
.body {
  top: 5px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  height: 55vh;
  /* background-color: #f0f2f5; */
}

.content {
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
}

.value {
  font-size: 25px;
  color: #009fe3;
  margin-bottom: 10px;
}
</style>
