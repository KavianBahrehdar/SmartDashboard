<template>
    <!-- <form @submit.prevent="signUp" class="signup-form">
      <input type="text" v-model="name" placeholder="name" required />
      <input type="text" v-model="username" placeholder="username" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="password" required />
      <input type="password" v-model="confirmPassword" placeholder="password" required />
      <input type="dateOfBirth" v-model="dateOfBirth" placeholder="dateOfBirth" required />
      <button type="submit">Sign Up</button>
    </form> -->
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container" style="margin-top: 35px;">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-8 col-lg-6">
            <div class="card" style="border-radius: 15px; background-color: #1A4273;" >
              <div class="card-body p-5">
                <h2 class="text text-center mb-4" style="color: white;" v-if="userName">You are logged in as <b>{{ userName }}</b></h2>
                <h2 class="text text-center mb-4" style="color: white;" v-else> Please login </h2>
                <!-- <h2 class="text-uppercase text-center mb-4" style="color: white;">Sign In!</h2> -->

                <form @submit.prevent="signUp" >
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text"  v-model="username" id="username" class="form-control form-control-lg" />
                    <label class="form-label" for="username">Your Username</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" v-model="password" id="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button type="submit"
                      data-mdb-button-init data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Sign In</button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">Dont Have already an account? <a href="/signup"
                      class="fw-bold text-body"><u>Sign up</u></a></p>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
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
    const name = ref<string>()
    const username = ref<string>()
    const email = ref<string>()
    const password = ref<string>()
    const confirmPassword = ref<string>()
    const dateOfBirth = ref<string>()
    const data = ref([])
    const id = ref([])
    const userName = ref([])
    // function to check the username and password and sign in
    async function signUp () {
      try {
        axios.defaults.withCredentials = true
        await axios.post('http://localhost:3000/api/users/signin', {
          username: username.value,
          password: password.value
        }, { headers: { 'Content-Type': 'application/json' } })
        // alert('You are logged in')
        // data.value = user.value
        router.push('/')
        // console.log(data.value[0])
        // Redirect or do something else upon successful sign-up
      } catch (error) {
        alert('Error: ' + error + ': Username or Password is wrong')
        console.log(error)
      }
    }
    // function to get the username and show in login box
    async function getUserName () {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get('http://localhost:3000/api/users/profile')
        userName.value = response.data.username
      } catch (error) {
        alert('Error: ' + error)
        console.log(error)
      }
    }
    onMounted(() => {
      getUserName()
    })
    return {
      signUp,
      name,
      username,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      userName,
      id
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
input {
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
