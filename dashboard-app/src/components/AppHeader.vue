<template>
<nav class="navbar navbar-expand-lg secondNavbar" id="secondNavbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
        <img src="https://th-deg.de/static/images/logos/THD-Logo.png" class="img-brand" alt="Responsive image">
    </a>
    <div class="pull-left">
        <button @:click="changeDisplay" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar-always"></span>
            <span class="icon-bar-always"></span>
            <span class="icon-bar-always"></span>
        </button>
    </div>
    <div v-if="show" class="dropdown collapse navbar-collapse show mobile" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <a data-delay="1000" data-close-others="true" class="nav-link" href="/">Home<span class></span><span class></span></a>
        </li>
        <li class="nav-item">
            <div><AppSetting/></div>
            <!-- <a data-delay="1000" data-close-others="true" class="nav-link" href="/setting">Setting<span class></span><span class></span></a> -->
        </li>
        <li class="nav-item">
            <div><AppTask/></div>
            <!-- <a data-delay="1000" data-close-others="true" class="nav-link" href="/setting">Setting<span class></span><span class></span></a> -->
        </li>
        <li class="nav-item">
            <a data-delay="1000" data-close-others="true" class="nav-link" href="/weather">Weather<span class></span><span class></span></a>
        </li>
        <li class="nav-item">
            <a data-delay="1000" data-close-others="true" class="nav-link" href="/signin">Login<span class></span><span class></span></a>
        </li>
      </ul>
    </div>
    <div v-else class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <div><AppSetting/></div>
            <!-- <a data-delay="1000" data-close-others="true" class="nav-link" href="/setting">Setting<span class></span><span class></span></a> -->
        </li>
        <li class="nav-item">
            <div><AppTask/></div>
            <!-- <a data-delay="1000" data-close-others="true" class="nav-link" href="/setting">Setting<span class></span><span class></span></a> -->
        </li>
        <li class="nav-item">
            <a data-delay="1000" data-close-others="true" class="nav-link" href="/">Home<span class></span><span class></span></a>
        </li>
        <li class="nav-item">
            <a data-delay="1000" data-close-others="true" class="nav-link" href="/weather">Weather<span class></span><span class></span></a>
        </li>
        <li class="nav-item">
            <a data-delay="1000" data-close-others="true" class="nav-link" href="/signin">Login<span class></span><span class></span></a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import AppSetting from './AppSetting.vue'
import AppTask from './AppTask.vue'
export default defineComponent({
  components: {
    AppSetting,
    AppTask
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeDisplay (this: { show: boolean }) {
      this.show = !this.show
      console.log(this.show)
    }
  }
})
</script>
<style>
.navbar .nav-link {
    color: white!important;
}
.img-brand {
    margin-left: -47px;
    transform: scale(0.7);
    max-width: 380px !important;
    display: block;
    max-width: 100%;
    transform: scale(0.9);
}

img {
    border: 0;
    -ms-interpolation-mode: bicubic;
    vertical-align: middle;
}
.secondNavbar {
    height: 100px;
    top: 0;
    position:fixed;
    width: 100%;
}
.secondNavbar {
    height: 100px;
    position: fixed;
    width: 100%;
    background-color: rgba(47, 47, 47, 0.90);
    z-index: 1020;
}
.secondNavbar .icon-bar-always + .icon-bar-always {
    margin-top: 4px;
}
.secondNavbar .icon-bar-always {
    width: 38px;
    height: 1px;
    border: 2px solid #fff;
    display: block;
    border-radius: 1px;
}
#navbarNav {
    top: 20px;
    /* display: inline-block; */
}
#navbarNav.show {
    /* width: 100% !important; */
    /* display: block; */
    padding-left: auto;
    padding-right: auto !important;
    margin-top: auto;
    right: 0px;
    background-color: rgba(47, 47, 47, 0.90);
    position:absolute;
    /* z-index: 1030; */
}
#navbarNav.mobile .dropdown .nav-link {
    float: left;
}
#navbarNav.mobile {
    /* display: block; */
    /* position: relative; */
    right: 0;
    top: 100%;
    width: 100%;
    margin-bottom: 5px;
    margin-top: auto;
    display: inline-block;
    background-color: rgba(47, 47, 47, 0.90);
    z-index: 1030;
}
.dropup, .dropright, .dropdown, .dropleft {
    position: relative;
}
#navbarNav .nav-item {
    padding-left: 10px;
}
p, a, li, h4, h5, option {
    font-family: 'Saira', sans-serif;
}
.navbar-expand-lg > .container, .navbar-expand-lg > .container-fluid {
    padding-right: 10px;
    padding-left: 10px;
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
</style>
<!-- <style scoped>

#primary-nav {
    top: 20px;
    display: inline-block;
}

.dropup, .dropright, .dropdown, .dropleft {
    position: relative;
}
.container-full {
    margin: 0;
    width: 100;
}
body{
    font-size: 20px;
    line-height: 1.5;
}
div {
    display: block;
    unicode-bidi: isolate;
}

#primary-nav.mobile li {
    width: 100%;
    margin: 0;
}
#primary-nav .nav-item {
    padding-left: 30px;
}
#primary-nav .nav-item {
    padding-left: 0 !important;
}

#primary-nav.mobile .dropdown .nav-link {
    float: left;
}
#primary-nav.mobile li a {
    padding: 1rem;
}
#primary-nav li a {
    color: #333;
    padding: 1px;
}
.navbar .nav-link {
    color: white !important;
}

#primary-nav.mobile.show {
    right: 0;
    width: 100%;
}
.navbar-nav .nav-link {
    padding-right: 0;
    padding-left: 0;
}
.menu li a {
    display: block;
    text-decoration: none;
}
a, a:link, a:focus, a:active, a:visited {
    outline: 0;
}
.nav-link {
    display: block;
    padding: 0.5rem 1rem;
}
a {
    color: #428bca;
    text-decoration: none;
}
p, a, li, h4, h5, option {
    font-family: 'Saira', sans-serif;
}
#primary-nav > ul {
    margin-right: 20px;
}
#primary-nav.show {
    width: 100% !important;
    display: block;
    padding-left: auto;
    padding-right: auto !important;
    right: 0px;
    background-color: rgba(47, 47, 47, 0.98);
    position: fixed;
    z-index: 10000;
}
#primary-nav.mobile {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 100%;
    margin-bottom: 5px;
    margin-top: auto;
    display: inline-block;
    background-color: rgba(47, 47, 47, 0.90);
    z-index: 1030;
}
p, a, li, h4, h5, option {
    font-family: 'Saira', sans-serif;
}

.secondNavbar .icon-bar-always + .icon-bar-always {
    margin-top: 4px;
}
.secondNavbar .icon-bar-always {
    width: 38px;
    height: 1px;
    border: 2px solid #fff;
    display: block;
    border-radius: 1px;
}
#primary-nav-button.mobile {
    display: inline-block;
}
#primary-nav-button.selected {
    background: rgba(0, 0, 0, 0.1);
}
#primary-nav-button {
    background: transparent;
    padding: 0;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
    font-size: 0;
    padding: 2.25rem 1.75rem 2rem 1.75rem;
    font-size: 3.25rem;
    padding: 1.5rem 1.75rem 1.5rem 1.75rem !important;
}
#primary-nav-button:hover {
    background: rgba(0, 0, 0, 0.05);
}
.secondNavbar .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 3.25rem;
    line-height: 2;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    margin-right: 10px;
    position: initial;
    padding: 0;
    text-decoration: none;
    text-align: center;
    font-weight: 500;
    font-size: 0;
    padding: 2.25rem 0.75rem 2rem 0.75rem;
    font-size: 3.25rem;
}
.img-brand {
    margin-left: -47px;
    transform: scale(0.7);
    max-width: 380px !important;
    display: block;
    max-width: 100%;
    transform: scale(0.9);
}

img {
    border: 0;
    -ms-interpolation-mode: bicubic;
    vertical-align: middle;
}

.secondNavbar {
    height: 100px;
    top: 0;
    position:fixed;
    width: 100%;
}
.navbar {
    padding: 0 !important;
    height: 85px;
    width: 100%;
    background-color: rgba(47, 47, 47, 0.8);
    position: relative;
    display: -ms-flexbox;
    display: flex;
    top: 0;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.5rem 1rem;
}

.secondNavbar {
    height: 100px;
    position: fixed;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1020;
}
.container-fluid {
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
    margin-right: auto;
    margin-left: auto;
}
.navbar-expand-lg > .container, .navbar-expand-lg > .container-fluid {
    padding-right: 10px;
    padding-left: 10px;
}
.navbar > .container, .navbar > .container-fluid {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.secondNavbar .navbar-brand {
    height: auto;
    margin-right: 20px;
    margin-left: 20px;
    padding: 0px;
}
.secondNavbar .nav-link {
    color: rgb(10, 10, 10) !important;
    font-size: 13pt;
}
</style> -->
