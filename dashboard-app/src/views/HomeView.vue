<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.6/dist/css/bootstrap.min.css"> -->
  </head>
  <AppWeather/>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <AppCard bgColor="#1A4273" iconClass="fas  fa-chart-column fa-3x card-icon" title="Dynamic Chart" Link="https://stwno.de/de/gastronomie/speiseplan/th-deggendorf" text_link="TH Mensa Deggendorf">
            <button @click="showHumidityChart" class="chart-button">Humidity</button>
            <button @click="showTemperatureChart" class="chart-button">Temperature</button>
            <div v-if="showHumidity"><AppHumidity/></div>
            <div v-else><AppTemperature/></div>
          </AppCard>
        </div>
        <div class="col-md-5">
          <AppCard bgColor="#1A4273" iconClass="fas fa-user fa-3x card-icon" title="Profile">
            <UserProfile/>
          </AppCard>
        </div>
        <div class="col-md-4">
          <AppCard bgColor="#313131" iconClass="fas fa-utensils fa-beer-mug-empty fa-map fa-3x card-icon" title="Mensa">
              <AppMensa/>
          </AppCard>
        </div>
        <div class="col-md-4">
          <AppCard bgColor="#313131" iconClass="fas fa-laptop fa-3x card-icon">
            <SystemMemApp/>
          </AppCard>
        </div>
        <div class="col-md-4">
          <AppCard bgColor="#313131" iconClass="fas fa-map-marker-alt fa-3x card-icon">
            <AppElectricity/>
          </AppCard>
        </div>
        <div class="col-md-7">
          <AppCard bgColor="#313131">
            <AppMap/>
          </AppCard>
        </div>
        <div class="col-md-5">
          <AppCard bgColor="#313131">
            <AppTaskDashboard/>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import AppMensa from '../components/AppMensa.vue'
import AppCard from '@/components/AppCard.vue'
import AppWeather from '@/components/AppWeather.vue'
import AppHumidity from '@/components/AppHumidity.vue'
import AppTemperature from '@/components/AppTemperature.vue'
import AppMap from '@/components/AppMap.vue'
import UserProfile from '@/components/UserProfile.vue'
import SystemMemApp from '@/components/SystemMemApp.vue'
import AppElectricity from '@/components/AppElectricity.vue'
import AppTaskDashboard from '@/components/AppTaskDashboard.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppMensa,
    AppCard,
    AppWeather,
    AppHumidity,
    AppTemperature,
    AppMap,
    UserProfile,
    SystemMemApp,
    AppElectricity,
    AppTaskDashboard
  },
  setup () {
    const showHumidity = ref(true)
    const showTemperature = ref(false)

    function showHumidityChart () {
      showHumidity.value = true
      showTemperature.value = false
    }
    function showTemperatureChart () {
      showHumidity.value = false
      showTemperature.value = true
    }
    return {
      showHumidity,
      showTemperature,
      showHumidityChart,
      showTemperatureChart
    }
  }

})
</script>
<style scoped>
@media (min-width: 768px) {
  .container, .container-md, .container-sm {
        max-width: 100vw;
  }
}
.chart-button {
  padding: 1px 1px;
  margin-bottom: px;
  font-size: 16px;
  border: 2px solid #009FE3;
  background-color: #009FE3;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
.chart-button:hover {
  background-color: #0056b3;
}
</style>
