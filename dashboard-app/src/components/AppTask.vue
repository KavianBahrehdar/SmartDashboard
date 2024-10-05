<template>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="background-color: transparent; border: none;">
  Task
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Today Task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="changeTask" >
            <div data-mdb-input-init class="form-outline mb-4">
            <input type="text"  v-model="task" id="username" class="form-control form-control-lg" />
            <label class="form-label" for="username">Your-Task</label>
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
    const task = ref<string>()
    // get the logged in user id
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
    // change the task of the logged in user
    async function changeTask () {
      try {
        axios.defaults.withCredentials = false
        await axios.post('http://localhost:3000/api/task/changetask', {
          userId: userId.value,
          task: task.value
        }, { headers: { 'Content-Type': 'application/json' } })
        // router.push('/')
        alert('Task changed successfully')
      // console.log(data.value[0])
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // get the task of logged in user
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
      changeTask,
      task
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
