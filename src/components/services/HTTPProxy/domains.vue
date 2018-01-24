<template>
  <div class="container container-600">
    <div class="pad">
      <h2>{{ title }}</h2>
      <div class="list-add-item" v-if="enabled">
        <input v-model="domain" type="text" class="input" placeholder="Enter new domain">
        <button class="button button-success right">Add Domain</button>
      </div>
      <div v-else class="cannot-edit-message">
        {{ forbiddenMessage }}
      </div>

      <ul>
        <li class="list-item">
          <span class="title"><strong>google.com</strong></span>
          <div class="listener-actions">
            <button class="button button-sm" :disabled="!enabled">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      forbiddenMessageKey: String,
      domains: Array,
      proxy: String,
      enabled: Boolean
    },
    data () {
      return {
        domain: null,
        list: []
      }
    },
    created () {
      this.list = JSON.parse(JSON.stringify(this.domains))
    },
    computed: {
      forbiddenMessage () {
        return this.$i18n.t(this.forbidden)
      }
    },
    methods: {
      remove(index) {
        this.list.splice(index, 1)
        this.update()
      },
      add () {
        if (this.domain) {
          this.list.push(domain)
          this.reset()
          this.update()
        }
      },
      update () {
        this.$emit('update', this.list)
      },
      reset () {
        this.domain = null
      }
    }
  }
</script>
