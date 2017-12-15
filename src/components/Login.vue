<template>
  <div id="login">
		<div id="mainContainer">
      <div id="authContainer">
        <div id="logo"><img src="~@/assets/img/logo.svg"></div>
        <div id="authContent">
          <h1>Log into your account</h1>
          <form id="loginForm">
            <div class="message info" v-if="!loginError && this.$route.query.redirect">Please log in to continue.</div>
            <div class="message error" v-if="loginError">{{ loginError }}</div>
            <label for="loginUsername">Username</label>
            <input type="text" v-model="loginUsername" id="loginUsername" :disabled="disableForm" placeholder="Enter username">
            <label for="loginPassword">Password</label>
            <input type="password" v-model="loginPassword" id="loginPassword" :disabled="disableForm" placeholder="Enter password">
            <button @click.prevent="submitLogin" @keyup.enter="submitLogin" :disabled="disableForm">{{ disableForm ? 'Please Wait' : 'Log In' }}</button>
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
  import auth from '../api/auth.js'

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
        auth.login({
          data: {
            authKey: parent.loginUsername,
            password: parent.loginPassword
          },
          loginSuccess: function (msg) {
            parent.loginError = null
            parent.disableForm = false

            if (parent.$route.query.redirect) {
              parent.$router.push({ path: parent.$route.query.redirect })
            } else {
              parent.$router.push({ name: 'dashboard' })
            }
          },
          loginFailed: function (msg) {
            parent.loginError = msg
            parent.disableForm = false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/_auth.scss';
</style>
