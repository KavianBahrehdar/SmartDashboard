<template>
    <AppWeather/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppWeather from '@/components/AppWeather.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppWeather
  }
})
</script>
<style scoped>
</style>
