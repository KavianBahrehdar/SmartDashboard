<template>
<!-- setting popup the change the setting uri of the sensor -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" style="background-color: transparent; border: none;">
  <i class="fa-solid fa-2x fa-gear"></i>
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Change Sensor-URI</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="changeURI" >
            <div data-mdb-input-init class="form-outline mb-4">
            <input type="text"  v-model="weatherURI" id="username" class="form-control form-control-lg" />
            <label class="form-label" for="username">Weather-URI</label>
            </div>

            <div data-mdb-input-init class="form-outline mb-4">
            <input type="text" v-model="stromURI" id="password" class="form-control form-control-lg" />
            <label class="form-label" for="password">Strom-URI</label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { response } from 'express'
import router from '@/router'
export default {
  setup () {
    const userId = ref<string>()
    const weatherURI = ref<string>()
    const stromURI = ref<string>()
    // get the logged in user id
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
    // change the uri of logged in user
    async function changeURI () {
      try {
        axios.defaults.withCredentials = false
        await axios.post('http://localhost:3000/api/setting/changesetting', {
          userId: userId.value,
          weatherURI: weatherURI.value,
          stromURI: stromURI.value
        }, { headers: { 'Content-Type': 'application/json' } })
        // router.push('/')
        alert('URI changed successfully')
      // console.log(data.value[0])
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // get the uri of logged in user
    async function getURI () {
      try {
        const responseSetting = await axios.get(`http://localhost:3000/api/setting/getsetting/${userId.value}`)
        // router.push('/')
        weatherURI.value = responseSetting.data.weatherURI
        stromURI.value = responseSetting.data.stromURI
        console.log(weatherURI)
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
      changeURI,
      weatherURI,
      stromURI
    }
  }
}
</script>
<style scoped>
.modal-backdrop {
    position: relative !important;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
}
</style>
