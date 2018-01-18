<template>
  <div>
    <top title="Add User">
      <router-link :to="{ name: 'users' }" class="button">
        Cancel
      </router-link>
    </top>
    <user-form action="create"></user-form>
  </div>
</template>

<script>
  import Top from '../common/top'
  import userForm from './form'

  export default {
    components: {
      Top,
      userForm
    },
    metaInfo: {
      title: 'Add User'
    },
    beforeRouteLeave (to, from, next) {
      if (window.confirm(this.$i18n.t(`LEAVE_CONFIRM_DIALOG`))) {
        next()
      } else {
        next(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';
</style>
