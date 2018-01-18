<template>
  <div>
    <top title="VPN Server"></top>

    <ul>
      <li v-for="(status, service) in services" :key="service">
        <strong>{{ service }}</strong>: {{ status }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Top from '../common/top'

  export default {
    created () {
      this.setup()
    },
    computed: {
      ...mapGetters({
        services: 'services/list'
      })
    },
    methods: {
      ...mapActions({
        fetchServices: 'services/fetch'
      }),
      async setup () {
        await this.fetchServices()
      }
    },
    components: {
      Top
    }
  }
</script>

<style>

</style>
