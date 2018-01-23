<template>
  <div>
    <top title="Edit Service">
      <button @click="askBeforeExiting" class="button">Cancel</button>
    </top>
    <form v-if="config">
      <div class="container container-600">
        <div class="pad">
          <h2>Proxy Mode</h2>
          <select v-model="proxy" @change="proxyChanged">
            <option v-for="option in proxyTypes" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <listeners @updateListeners="updateListeners" :listeners="config.listeners"></listeners>

      <allowed-domains :proxyMode="proxy"></allowed-domains>

      <banned-domains :proxyMode="proxy"></banned-domains>

      <div class="container container-600">
        <div class="pad">
          <button class="button button-info" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">
            {{ formDisable ? 'Please wait...' : 'Update Configuration' }}
          </button>
          <button class="button button-light right" @click.prevent="cancel">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import serviceAPI from '../../../api/service.js'
  import top from '../../common/top'
  import listeners from './listeners'
  import allowedDomains from './allowedDomains'
  import bannedDomains from './bannedDomains'

  export default {
    data () {
      return {
        config: {
          listeners: []
        },
        proxyTypes: ['Normal', 'ExclusiveAllow'],
        proxy: null,
        formDisable: false
      }
    },
    created () {
      this.setup()
      this.proxy = this.proxyTypes[0];
      console.log('Loaded config', this.config)
    },
    methods: {
      async setup () {
        await serviceAPI.get({
          name: 'HTTPProxy',
          success: response => {
            this.config = response.data.result[0]
          },
          fail: error => {
            console.log(error)
            this.$router.push({ name: 'error404' })
          }
        })
      },
      askBeforeExiting () {
        if (confirm(this.$i18n.t('LEAVE_CONFIRM_DIALOG'))) {
          this.$router.push({ name: 'services' })
        }
      },
      updateListeners (listeners) {
        console.log('updated listeners', listeners)
      },
      proxyChanged () {
        console.log('proxy changed', this.proxy)
      }
    },
    components: {
      top,
      listeners,
      allowedDomains,
      bannedDomains
    },
    metaInfo: {
      title: 'Edit Service'
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/styles/_vars.scss';

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;

    &:nth-child(2n-1) {
      background: #F7F7F7;
    }
  }
  .list-add-item {
    display: flex;
    margin-bottom: $pad;

    .input {
      width: auto;
      flex: 1;
      margin-right: 12px;
    }
  }
  .cannot-edit-message {
    margin-bottom: $pad;
    color: $color-dark;
  }
</style>
