<template>
  <div id="login">
		<div id="mainContainer">
      <div id="authContainer">
        <div id="logo"><img src="~@/assets/img/logo.svg"></div>
        <div id="authContent">
          <h1>Log into your account</h1>
          <form id="loginForm">
            <div class="message error" v-if="loginError">{{ loginError }}</div>
            <label for="loginUsername">Username</label>
            <input type="text" v-model="loginUsername" id="loginUsername" :disabled="disableForm" placeholder="Enter username">
            <label for="loginPassword">Password</label>
            <input type="password" v-model="loginPassword" id="loginPassword" :disabled="disableForm" placeholder="Enter password">
            <button @click="submitLogin" :disabled="disableForm">{{ disableForm ? 'Please Wait' : 'Log In' }}</button>
          </form>
        </div>
        <div id="authBottom">
          <a href="#">Don’t have an account? <strong>Create one now.</strong></a>
        </div>
      </div>
		</div>
  </div>
</template>

<script>
  /* eslint-disable */ // TODO: remove
  import API from '../api/index.js'
  import router from '../router'

  export default {
    name: 'login',
    metaInfo: {
      title: 'Login'
    },
    data: function () {
      return {
        loginUsername: null,
        loginPassword: null,
        loginError: null,
        disableForm: false
      }
    },
    methods: {
      submitLogin () {
        // Disable form while HTTP request being made
        this.disableForm = true

        let parent = this

        // Make API login request
        API.login({
          authKey: parent.loginUsername,
          password: parent.loginPassword
        }, function (msg) {
          parent.loginError = null
          parent.disableForm = false
          parent.$router.push({ name: 'Users' })
        }, function (msg) {
          parent.loginError = msg
          parent.disableForm = false
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/_auth.scss';
</style>
