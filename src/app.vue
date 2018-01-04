<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import auth from './components/layouts/auth'
import basic from './components/layouts/basic'
import error from './components/layouts/error'
import master from './components/layouts/master'

export default {
  name: 'Spectero',
  computed: {
    ...mapGetters([
      'layout'
    ])
  },
  metaInfo: {
    title: null,
    titleTemplate: (titleChunk) => {
      return (titleChunk ? `${titleChunk} - ` : '') + 'Spectero'
    }
  },
  components: {
    auth,
    basic,
    error,
    master
  }
}
</script>

<style lang="scss">
  @import './assets/styles/_global.scss';
</style>
