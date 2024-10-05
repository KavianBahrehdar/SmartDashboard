<template>
    <div class="card" :style="{ backgroundColor: bgColor }">
        <div class="card-body">
            <i :class="iconClass" style="color: aliceblue;"></i>
            <div class="card-info">
                <h5 class="card-title">{{ title }}</h5>
                <!-- <p class="card-text">{{ text }}</p> -->
                <slot></slot>
                <!-- <a :href="Link" class="btn btn-primary">{{text_link}}</a> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
  props: {
    bgColor: {
      type: String as () => string,
      default: '#1A4273'
    },
    iconClass: {
      type: String as () => string,
      default: 'fas fa-map-marker-alt fa-3x card-icon'
    },
    title: {
      type: String as () => string
    },
    text: {
      type: String as () => string,
      default: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    Link: {
      type: String as () => string,
      default: '#'
    },
    text_link: {
      type: String as () => string,
      default: 'Go Somewhere'
    }
  }
}
</script>
<style scoped>
.slot {
  position: relative;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}
.card {
  width: 100%;
  margin: 5px autos;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
  height: 500px;
  /* width: 500px; */
}

.card-body {
  padding: 10px;
  height: 40px;
  position: relative;
}

.card-icon {
  position: absolute;
  top: 440px;
  /* right: 20px; */
  left: 20px;
}

.card-info {
  display: block;
  width: 100%;
  height: 500px;
  position: relative;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: rgba(0, 0, 0, 0.8); */
  /* padding: 10px; */
  border-radius: 15px;
  color: white;
}

/* .card:hover .card-info {
  display: block;
} */

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  position: relative;
  /* margin-top: 350px; */
  /* right: 20px; */
  /* left: 20px; */
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
