<template>
  <div>
    <top title="VPN Server"></top>

    <h2>Services:</h2>



    <ul>
      <li v-for="(status, service) in services" :key="service">
        <strong>{{ service }}</strong>: {{ status }}

        <button @click="start(service)">Start</button>
        <button @click="stop(service)">Stop</button>
      </li>
    </ul>

    <h2>IPs:</h2>

    <ul>
      <li v-for="(ip, index) in ips" :key="index">
        <strong>{{ ip }}</strong>
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
        services: 'services/services',
        ips: 'services/ips'
      })
    },
    methods: {
      ...mapActions({
        fetchServices: 'services/fetch',
        fetchIps: 'services/fetchIps',
        toggleStatus: 'services/toggleStatus'
      }),
      async setup () {
        await this.fetchServices()
        await this.fetchIps()
      },
      start (service) {
        this.toggleStatus({ service: service, action: 'start' })
      },
      stop (service) {
        this.toggleStatus({ service: service, action: 'stop' })
      }
    },
    components: {
      Top
    }
  }
</script>

<style>

</style>
