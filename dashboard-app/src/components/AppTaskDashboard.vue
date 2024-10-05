<template>
    <div class="body">
      <div class="content">
        <p class="title">Task</p>
        <p class="value">{{ task }}</p>
      </div>
    </div>
  </template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup () {
    const userId = ref<string>()
    const task = ref<string>()
    // get the id of logged in user, because every user has different task
    async function getUserId () {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get('http://localhost:3000/api/users/profile')
        userId.value = response.data.id
        console.log(userId.value)
        getTask()
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // get the task of the user and show in dashboard
    async function getTask () {
      try {
        const responseTask = await axios.get(`http://localhost:3000/api/task/gettask/${userId.value}`)
        // router.push('/')
        task.value = responseTask.data.task
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
      getTask,
      task
    }
  }
}
</script>
<style scoped>
.body {
  /* margin-top: 5px; */
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
