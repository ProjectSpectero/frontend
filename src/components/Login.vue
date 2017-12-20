<template>
  <div id="login">
		<div id="mainContainer">
      <div id="authContainer">
        <div id="logo"><img src="~@/assets/img/logo.svg"></div>
        <div id="authContent">
          <h1>Log into your account</h1>
          <form id="loginForm">
            <div class="message info" v-if="!formError && this.$route.query.redirect">Please log in to continue.</div>
            <div class="message error" v-if="formError">{{ formError }}</div>
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" :disabled="formDisable" placeholder="Enter username">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" :disabled="formDisable" placeholder="Enter password">
            <button @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">{{ formDisable ? 'Please Wait' : 'Log In' }}</button>
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
        username: null,
        password: null,
        formError: null,
        formDisable: false
      }
    },
    methods: {
      submit () {
        let parent = this
        parent.formDisable = true // Disable form while HTTP request being made

        auth.login({
          data: {
            authKey: parent.username,
            password: parent.password
          },
          loginSuccess: function (msg) {
            parent.formError = null

            if (parent.$route.query.redirect) {
              parent.$router.push({ path: parent.$route.query.redirect })
            } else {
              parent.$router.push({ name: 'dashboard' })
            }
          },
          loginFailed: function (err) {
            // parent.formError = err
            parent.formDisable = false
          }
        })
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/_auth.scss';
</style>
