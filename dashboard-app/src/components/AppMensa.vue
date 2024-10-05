<template>
  <!-- show the mensa plan of the day -->
    <div class="body">
      <div class="date-input">
        <input type="date" v-model="selectedDate" @change="created">
      </div>
      <br>
      <!-- <button v-on:click="created" class="primary-btn btn" style="color: black;">click</button> -->
      <!-- <div v-if="loading">Lade...</div> -->
      <!-- <div v-else-if="error">Fehler beim Laden der Daten</div> -->
      <div>
        <div v-for="(meal, index) in meals" :key="index">
          <p3 style="color: red;">{{ meal.category }} </p3>
          <br>
          <p2>{{ meal.name }}</p2>
          <br>
          <p3 style="color: #009FE3;">students: {{ meal.prices.students }}€ </p3>
          <br>
          <p3 style="color: #009FE3;">employees: {{ meal.prices.employees }}€ </p3>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
export default {
  setup () {
    const selectedDate = ref(new Date())
    const meals = ref([])

    // get the mensa data of the specific date
    async function created () {
      try {
        const response = await axios.get(`http://localhost:3000/mensa-menu/${selectedDate.value}`)
        meals.value = response.data
        // loading = false
      } catch (error) {
        console.log('Fehler beim Laden der Daten: ', error)
      }
    }
    onMounted(() => {
      created()
    })
    return {
      meals,
      selectedDate,
      created
    }
  }
  // data () {
  //   return {
  //     // selectedDate: '',
  //     meals: [],
  //     mensa: '',
  //     loading: true,
  //     error: false
  //   }
  // },
  // methods: {
  //   async created () {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/mensa-menu/${this.selectedDate}`)
  //       this.meals = response.data
  //       this.loading = false
  //     } catch (error) {
  //       console.log('Fehler beim Laden der Daten: ', error)
  //     }
  //   }
  // }
}
</script>
<style scoped>

.date-input input[type="date"] {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

/* Farbe und Hover-Stil für das Date-Eingabefeld */
.date-input input[type="date"] {
  background-color: #f9f9f9;
}

.date-input input[type="date"]:hover {
  background-color: #f0f0f0;
}

.date-input input[type="date"]:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
