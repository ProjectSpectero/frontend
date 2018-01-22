<template>
  <div>
    <top title="Add User">
      <button @click="askBeforeExiting" class="button">Cancel</button>
    </top>
    <user-form action="create" @onCancel="askBeforeExiting"></user-form>
  </div>
</template>

<script>
  import Top from '../common/top'
  import userForm from './form'

  export default {
    methods: {
      askBeforeExiting () {
        if (confirm(this.$i18n.t('LEAVE_CONFIRM_DIALOG'))) {
          this.$router.push({ name: 'users' })
        }
      }
    },
    components: {
      Top,
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
