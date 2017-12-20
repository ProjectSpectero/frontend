<template>
  <modal name="deleteUser" height="auto" :scrollable="true" @before-open="beforeOpen">
    <h2>Delete User</h2>
    <form id="deleteUserForm">
      <div class="message error" v-if="formError">{{ formError }}</div>
      <p>Are you sure you want to do this? This cannot be undone.</p>
      <button @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable" class="red">{{ formDisable ? 'Please Wait' : 'Delete User' }}</button>
      <button @click.prevent="$modal.hide('deleteUser')">Cancel</button>
    </form>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import user from '../../api/user.js'

  export default {
    name: 'delete-user-modal',
    data: function () {
      return {
        user: null,
        formError: null,
        formDisable: false
      }
    },
    methods: {
      beforeOpen (event) {
        this.reset()
        this.user = event.params.user
      },
      submit () {
        let parent = this
        parent.formDisable = true // Disable form while HTTP request being made

        user.delete({
          data: {
            id: parent.user.id
          },
          success: function (msg) {
            parent.formError = null

            // Re-fetch users store to reflect new user (additionally live updates /users page data)
            parent.$store.dispatch('fetchUsers', { self: this })

            parent.$modal.hide('deleteUser')
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