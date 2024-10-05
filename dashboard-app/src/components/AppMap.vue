<template>
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css"> -->
  <div>
  <l-map style="width: 100%; height: 465px" :zoom="zoom" :center="[48.84085000 ,12.96068000]">
     <l-marker
     :lat-lng="[48.84085000, 12.96068000]"
     />
     <l-marker
     :lat-lng="[48.829460, 12.954853]"
     />
     <l-control-layers
        :position="layersPosition"
        :collapsed="false"
        :sort-layers="true"
      />
     <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
      />
  </l-map>
  </div>
  </template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { LMap, LGeoJson, LTileLayer, LCircle, LMarker, LControlLayers } from '@vue-leaflet/vue-leaflet'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers
  },
  setup () {
    // var map = LMap('map').setView([51.505, -0.09], 13)
    const apikey = ref('a975fadea03835048bd043c2a8a5bffe')
    const tileProviders = [
      {
        name: 'OpenStreetMap',
        visible: false,
        attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      {
        name: 'OpenTopoMap',
        visible: true,
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      },
      {
        name: 'OpenWeatherMap',
        visible: true,
        url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apikey.value}`,
        attribution:
      'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
      }
    ]
    return {
      zoom: 13,
      tileProviders,
      layersPosition: 'topright'
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // attribution:
      // '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'

    }
  }
}

</script>
