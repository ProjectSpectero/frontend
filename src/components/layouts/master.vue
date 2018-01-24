<template>
  <div class="spectero">
    <sidebar></sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../common/sidebar'

  export default {
    components: {
      Sidebar
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

  .spectero {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .content {
    margin-left: $sidebar-width;
  }
</style>
