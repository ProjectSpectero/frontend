<template>
  <modal name="userCert" :adaptive="true" height="auto" width="500px" :scrollable="true" @before-open="beforeOpen">
    <button class="modal-close" @click.prevent="$modal.hide('userCert')"></button>
    <div class="modal-title">
      <div class="modal-title-icon"><span class="icon icon-lock"></span></div>
      <h2>View certificate</h2>
    </div>
    <form>
      <div>
        <label for="authKey">Username:</label>
        <textarea id="authKey" v-model="authKey" readonly></textarea>
      </div>
      <div>
        <label for="certificate">Certificate:</label>
        <textarea id="certificate" v-model="cert" readonly></textarea>
      </div>
      <div>
        <label for="key">Key:</label>
        <textarea id="key" v-model="certKey" readonly></textarea>
      </div>
      <button class="alt light right" @click.prevent="$modal.hide('userCert')">Close</button>
    </form>
  </modal>
</template>

<script>
  export default {
    name: 'user-cert-modal',
    data: function () {
      return {
        user: {},
        cert: null,
        certKey: null,
        authKey: null
      }
    },
    methods: {
      beforeOpen (event) {
        this.reset()
        this.user = event.params.user
        this.cert = this.user.cert
        this.certKey = this.user.certKey
        this.authKey = this.user.authKey
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    div {
      margin-bottom: 20px;
    }
    textarea {
      font: 14px/18px monospace;
    }
    textarea#authKey {
      height: 44px;
    }
    textarea#key {
      height: 88px;
    }
  }
</style>