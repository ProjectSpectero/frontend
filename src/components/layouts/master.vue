<template>
  <div class="spectero">
    <top></top>
    <router-view></router-view>
  </div>
</template>

<script>
  import Top from '../common/top'

  export default {
    components: {
      Top
    }
  }
</script>

<style>

</style>
