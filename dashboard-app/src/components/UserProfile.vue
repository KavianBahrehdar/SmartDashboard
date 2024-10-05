<template>
    <div v-if="isAuthenticated">
        <h1>Welcome {{ username }}</h1>
        <form @submit.prevent="updateProfile" @reset.prevent="deleteProfile">
          <input type="text" v-model="name" id="name" class="form-control form-control-lg" />
          <label class="form-label" for="name">name</label>
          <input type="text" v-model="email" id="email" class="form-control form-control-lg" />
          <label class="form-label" for="email">email</label>
          <select type="text" v-model="study" id="study" class="form-control form-control-lg">
            <option value="B.Eng.Angewandte Informatik">B.Eng.Angewandte Informatik</option>
            <option value="B.Eng.Bauingenieurwesen">B.Eng.Bauingenieurwesen</option>
            <option value="B.Sc.Artificial Intelligence">B.Sc.Artificial Intelligence</option>
            <option value="M.Sc.Angewandte Informatik">M.Sc.Angewandte Informatik</option>
            <option value="M.Sc.Angewandte Informatik">M.Sc.Angewandte Informatik</option>
          </select>
          <!-- <input type="date" v-model="dateOfBirth" id="dateOfBirth" class="form-control form-control-lg" />
          <label class="form-label" for="dateOfBirth">Birthday</label> -->
          <br>
          <div class="group-button" style="display: flex; gap: 10px; padding-left: 12vw;">
            <button type="submit" class="button"><i class="fa fa-refresh fa-2x"></i></button>
            <button type="reset" class="button"><i class="fa fa-trash fa-2x"></i></button>
            <button @click="logoutProfile" class="button" ><i class="fa fa fa-sign-out fa-2x" aria-hidden="true"></i></button>
          </div>
        </form>
        <!-- <div class="group-button" style="display: flex; gap: 10px; padding-left: 13vw;">
          <button @click="logoutProfile" class="button" ><i class="fa fa-arrow-circle-right fa-2x"></i></button>
        </div> -->
      </div>
  </template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { response } from 'express'
import { jwtDecode } from 'jwt-decode'
import router from '@/router'
export default {
  setup () {
    const name = ref<string>('')
    const username = ref<string>('')
    const email = ref<string>('')
    const password = ref<string>()
    const confirmPassword = ref<string>()
    const dateOfBirth = ref<string>('')
    const study = ref<string>()
    const data = ref([])
    const id = ref('')
    const user = ref([])
    const isAuthenticated = ref<boolean>(false)

    // function to get user data from database and show in the dashboard
    async function profile () {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get('http://localhost:3000/api/users/profile')
        username.value = response.data.username
        name.value = response.data.name
        email.value = response.data.email
        study.value = response.data.study
        dateOfBirth.value = response.data.dateOfBirth
        data.value = user.value
        id.value = response.data.id
        router.push('/')
        isAuthenticated.value = true
      // console.log(data.value[0])
        // Redirect or do something else upon successful sign-up
      } catch (error) {
        alert('Error: ' + error + ': Username or Password is wrong')
        console.log(error)
      }
    }
    // function to update the user profile on dashboard page
    async function updateProfile () {
      try {
        // axios.defaults.withCredentials = true
        console.log(name.value)
        await axios.patch('http://localhost:3000/api/users/updateProfile', {
          id: id.value,
          name: name.value,
          username: username.value,
          email: email.value,
          study: study.value
        }, { headers: { 'Content-Type': 'application/json' } })
        // alert('User updated successfully')
        // console.log(data.value[0])
        // Redirect or do something else upon successful sign-up
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }

    // function to delete user profile on dashboard page
    async function deleteProfile () {
      try {
        console.log(name.value)
        await axios.post('http://localhost:3000/api/users/deleteProfile', {
          id: id.value
        }, { headers: { 'Content-Type': 'application/json' } })
        alert('User deleted successfully')
        // console.log(data.value[0])
        // Redirect or do something else upon successful sign-up
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    // function to logout the user from dashboard page
    async function logoutProfile () {
      try {
        console.log(name.value)
        axios.defaults.withCredentials = true
        await axios.post('http://localhost:3000/api/users/signout', {
          id: id.value
        }, { headers: { 'Content-Type': 'application/json' } })
        alert('User logout successfully')
        router.push('/signin')
        isAuthenticated.value = false
        // console.log(data.value[0])
        // Redirect or do something else upon successful sign-up
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    onMounted(() => {
      profile()
    })
    return {
      profile,
      updateProfile,
      deleteProfile,
      logoutProfile,
      name,
      username,
      email,
      study,
      password,
      confirmPassword,
      dateOfBirth,
      user,
      id,
      isAuthenticated
    }
  }
}
</script>

<style scoped>
gradient-custom-3 {
  background: linear-gradient(45deg, #0056b3, #007bff);
}
.gradient-custom-4 {
  background: linear-gradient(45deg, #007bff, #0056b3);
}

.signup-form {
  max-width: 400px;
  margin: 0 auto;
}

input,
button {
  display: block;
  width: 100%;
}

button {
  /* margin-top: 20px; */
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
input::placeholder {
  color: #ced4da;
}
input, select{
  border-radius: 15px;
}

input:focus::placeholder {
  color: transparent;
}
label {
  color: white
}

p, a, u {
  color: white;
}
.button {
  padding: 1px 1px;
  width: 4vw;
  margin-bottom: 5px;
  font-size: 16px;
  border: 2px solid #009FE3;
  background-color: #009FE3;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /* margin-right: 10px; */
}
.button:hover {
  background-color: #0056b3;
}
</style>
