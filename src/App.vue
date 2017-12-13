<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: null,
    titleTemplate: (titleChunk) => {
      return (titleChunk ? `${titleChunk} - ` : '') + 'Spectero'
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/_global.scss';
</style>
