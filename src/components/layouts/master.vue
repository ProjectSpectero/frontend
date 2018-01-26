<template>
  <div class="spectero">
    <bar v-if="barComponent" :barComponent="barComponent"></bar>
    <sidebar></sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import bar from '../common/bar'
  import sidebar from '../common/sidebar'

  export default {
    computed: {
      ...mapGetters({
        barComponent: 'settings/bar',
      })
    },
    components: {
      bar,
      sidebar
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
