<template>
  <!-- this component is not availabe -->
    <div class="sidebar">
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <a :href="item.link">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </template>
<script lang="ts">
export default {
  data () {
    return {
      items: [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/about' },
        { title: 'Services', link: '/services' },
        { title: 'Contact', link: '/contact' }
      ]
    }
  }
}
</script>
<style scoped>
.sidebar {
    width: 250px;
    background-color: #333;
    padding: 20px;
    color: #fff;
}

ul {
list-style-type: none;
padding: 0;
}

li {
margin-bottom: 10px;
}

a {
color: #fff;
text-decoration: none;
}

a:hover {
text-decoration: underline;
}
</style>
