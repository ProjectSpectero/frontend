<template>
  <modal name="addUser" height="auto" :scrollable="true">
    <h2>Add User</h2>
    <form id="addUserForm">
      <div class="message error" v-if="formError">{{ formError }}</div>
      <label for="username">Username</label>
      <input type="text" v-model="username" id="username" :disabled="formDisable" placeholder="">
      <label for="password">Password</label>
      <input type="password" v-model="password" id="password" :disabled="formDisable" placeholder="">
      <label for="email">Email address</label>
      <input type="email" v-model="email" id="email" :disabled="formDisable" placeholder="example@spectero.com">
      <label for="fullName">Display name</label>
      <input type="text" v-model="fullName" id="fullName" :disabled="formDisable" placeholder="">
      <button @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">{{ formDisable ? 'Please Wait' : 'Log In' }}</button>
    </form>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import user from '../../api/user.js'

  export default {
    name: 'add-user-modal',
    data: function () {
      return {
        username: null,
        password: null,
        email: null,
        fullName: null,
        formError: null,
        formDisable: false
      }
    },
    methods: {
      submit () {
        let parent = this
        parent.formDisable = true // Disable form while HTTP request being made

        user.create({
          data: {
            authKey: parent.username,
            password: parent.password,
            emailAddress: parent.email,
            fullName: parent.fullName
          },
          success: function (msg) {
            parent.formError = null

            // Update users store to reflect new user (additionally live updates /users page data)
            parent.$store.dispatch('fetchUsers', { self: this })

            parent.$modal.hide('addUser')
            parent.reset()
          },
          fail: function (err) {
            parent.formError = err.data.errors[0]
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

<style lang="scss">
  
</style>