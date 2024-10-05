<template>
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container" style="margin-top: 35px;">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-8 col-lg-6">
            <div class="card" style="border-radius: 15px; background-color: #1A4273;" >
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-4" style="color: white;">Create an account</h2>

                <form @submit.prevent="signUp" >

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" v-model="name" id="name" class="form-control form-control-lg" />
                    <label class="form-label" for="name">Your Name</label>
                  </div>
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text"  v-model="username" id="username" class="form-control form-control-lg" />
                    <label class="form-label" for="username">Your Username</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" v-model="email" id="email" class="form-control form-control-lg" />
                    <label class="form-label" for="email">Your Email</label>
                  </div>
                  <div data-mdb-input-init class="form-outline mb-4">
                    <select type="text" v-model="study" id="study" class="form-control form-control-lg">
                      <option value="B.Eng.Angewandte Informatik">B.Eng.Angewandte Informatik</option>
                      <option value="B.Eng.Bauingenieurwesen">B.Eng.Bauingenieurwesen</option>
                      <option value="B.Sc.Artificial Intelligence">B.Sc.Artificial Intelligence</option>
                      <option value="M.Sc.Angewandte Informatik">M.Sc.Angewandte Informatik</option>
                      <option value="M.Sc.Angewandte Informatik">M.Sc.Angewandte Informatik</option>
                    </select>
                    <label class="form-label" for="study">Your Study</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" v-model="password" id="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password"  v-model="confirmPassword" id="resetpassword" class="form-control form-control-lg" />
                    <label class="form-label" for="resetpassword">Repeat your password</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="date"  v-model="dateOfBirth" id="dateofbirth" class="text-center form-control form-control-lg" />
                    <label for="dateofbith" class="form-label">Date Of Birth</label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button type="submit"
                      data-mdb-button-init data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                  </div>

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
import router from '@/router'
export default {
  setup () {
    const name = ref<string>()
    const username = ref<string>()
    const email = ref<string>()
    const password = ref<string>()
    const confirmPassword = ref<string>()
    const study = ref<string>()
    const dateOfBirth = ref<string>()
    // function to sign up new user to database
    async function signUp () {
      try {
        if (password.value !== confirmPassword.value) { // check if the passwords match
          alert('Password doesnt Match')
        } else {
          await axios.post('http://localhost:3000/api/users/signup', {
            name: name.value,
            username: username.value,
            email: email.value,
            study: study.value,
            password: password.value,
            confirm_password: confirmPassword.value,
            dateOfBirth: dateOfBirth.value

          }, { headers: { 'Content-Type': 'application/json' } })
          alert('User created successfully')
          router.push('/signin')
        }
      } catch (error) {
        alert('Error: ' + error + ': Username or Emial already exists')
        console.log(error)
      }
    }
    return {
      signUp,
      name,
      username,
      email,
      study,
      password,
      confirmPassword,
      dateOfBirth
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
input, select {
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
</style>
