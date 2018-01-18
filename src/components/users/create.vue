<template>
  <div>
    <top title="Add User"></top>
    <div class="container">
      <div class="container-800">
        <user-form action="create"></user-form>
      </div>
    </div>
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
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';
</style>
