<template>
  <div>
    <top title="Edit User">
      <button @click="askBeforeExiting" class="button">Cancel</button>
    </top>

    <user-form v-if="selectedUser" action="edit" :user="selectedUser" @onCancel="askBeforeExiting"></user-form>
  </div>
</template>

<script>
  import top from '../common/top'
  import userForm from './form'
  import userAPI from '../../api/user.js'

  export default {
    data () {
      return {
        selectedUser: null
      }
    },
    created () {
      userAPI.get({
        data: {
          id: this.$route.params.id
        },
        success: response => {
          this.selectedUser = response.data.result
        },
        fail: error => {
          console.log(error)
          this.backToList()
        }
      })
    },
    methods: {
      askBeforeExiting () {
        if (confirm(this.$i18n.t('LEAVE_CONFIRM_DIALOG'))) {
          this.backToList()
        } else {

        }
      },
      backToList () {
        this.$router.push({ name: 'users' })
      }
    },
    components: {
      top,
      userForm
    },
    metaInfo: {
      title: 'Add User'
    },
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';
</style>
