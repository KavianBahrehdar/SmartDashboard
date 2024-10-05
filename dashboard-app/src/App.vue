<template>
  <AppHeader/>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader
  }
})
</script>

<style>
@font-face {
  font-family: 'Saira';
  src: url('./assets/Saira/static/Saira-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: Saira, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a4273
}
.modal-backdrop {
    position: relative !important;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
}
/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
