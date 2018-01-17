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
  .spectero {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .content {
    flex: 1;
  }
</style>
