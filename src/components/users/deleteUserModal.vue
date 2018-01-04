<template>
  <modal name="deleteUser" :adaptive="true" height="auto" width="500px" :scrollable="true" :clickToClose="false" @before-open="beforeOpen">
    <button class="modal-close" @click.prevent="hide"></button>
    <div class="modal-title">
      <div class="modal-title-icon red"><span class="icon icon-trash"></span></div>
      <h2>Delete user</h2>
    </div>
    <div v-if="isCurrentUser ">
      <form>
        <div class="message error">{{ $t('errors.CANNOT_DELETE_SELF') }}</div>
        <button class="alt light right" @click.prevent="hide">Close</button>
      </form>
    </div>
    <div v-else>
      <p>Are you sure you want to delete the user <strong>{{ username }}</strong>?</p>
      <p><strong>WARNING:</strong> This action cannot be undone.</p>
      <form id="deleteUserForm">
        <div class="message error" v-if="formError">{{ formError }}</div>
        <input type="text" v-model="confirmDelete" placeholder="Type 'DELETE' to proceed" class="confirmInput">

        <button class="alt red" @click.prevent="submit" @keyup.enter="submit" :disabled="isDisabled">
          {{ formDisable ? 'Please Wait' : 'Delete User' }}
        </button>

        <button class="alt light right" @click.prevent="hide">Cancel</button>
      </form>
    </div>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import user from '../../api/user.js'

  export default {
    data () {
      return {
        user: {},
        formError: null,
        formDisable: false,
        confirmDelete: ''
      }
    },
    computed: {
      username () {
        return this.user !== null ? this.user.authKey : null
      },
      isCurrentUser () {
        return this.user.id === this.$store.getters.currentUser.id
      },
      isDisabled () {
        return this.formDisable || this.confirmDelete.toLowerCase() !== 'delete'
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
          success (msg) {
            parent.formError = null

            // Re-fetch users store to reflect new user (additionally live updates /users page data)
            parent.$store.dispatch('fetchUsers', { self: this })

            parent.$modal.hide('deleteUser')
            parent.reset()
          },
          fail (err) {
            parent.formError = err.data.errors[0]
            parent.formDisable = false
          }
        })
      },
      hide () {
        this.$modal.hide('deleteUser')
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>

<style lang="scss">
  #deleteUserForm {
    padding-top: 16px;

    .confirmInput {
      margin-bottom: 20px;
    }
  }
</style>