<template>
  <div id="dashboard">
    <h1 class="main-title">Node Details</h1>
    <section id="nodes">
      <h2>Information</h2>
      <p>Information related to this node (node ID: {{ id }}) will be here.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'nodeDetails',
  metaInfo: {
    title: 'Node Details'
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
