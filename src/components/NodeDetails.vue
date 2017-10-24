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
      id: null
    }
  },
  methods: {
    // Loads node details from an id - this will be re-run
    // if a URL change is made to update the component.
    loadNodeDetails: function (id) {
      this.id = id
    }
  },
  created: function () {
    this.loadNodeDetails(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.loadNodeDetails(to.params.id)
    next()
  }
}
</script>

<style scoped>

</style>
