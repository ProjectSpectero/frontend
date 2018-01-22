<template>
  <div>
    <top title="Edit Service">
      <button class="button">Cancel</button>
    </top>
    <form>
      <div class="container container-600">
        <div class="pad">
          <h2>Proxy Mode</h2>
          <select>
            <option>Normal</option>
          </select>
        </div>
      </div>
      <div class="container container-600">
        <div class="pad">
          <h2>Listeners</h2>
          <div class="list-add-item">
            <input type="text" class="input" placeholder="Enter new listener">
            <button class="button button-success right">Add Listener</button>
          </div>
          <ul>
            <li class="list-item">
              <span class="title"><strong>0.0.0.0</strong>:8800</span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>0.0.0.0</strong>:8800</span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>0.0.0.0</strong>:8800</span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>0.0.0.0</strong>:8800</span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>0.0.0.0</strong>:8800</span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container container-600">
        <div class="pad">
          <h2>Allowed Domains</h2>
          <div class="list-add-item">
            <input type="text" class="input" placeholder="Enter new domain">
            <button class="button button-success right">Add Domain</button>
          </div>
          <ul>
            <li class="list-item">
              <span class="title"><strong>google.com</strong></span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>spectero.com</strong></span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>stackoverflow.com</strong></span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container container-600">
        <div class="pad">
          <h2>Banned Domains</h2>
          <div class="list-add-item">
            <input type="text" class="input" placeholder="Enter new domain">
            <button class="button button-success right">Add Domain</button>
          </div>
          <ul>
            <li class="list-item">
              <span class="title"><strong>twitter.com</strong></span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
            <li class="list-item">
              <span class="title"><strong>facebook.com</strong></span>
              <div class="listener-actions">
                <button class="button button-sm">Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
  import { mapGetters, mapActions } from 'vuex'
  import Top from '../common/top'

  export default {
    components: {
      Top
    },
    metaInfo: {
      title: 'Edit Service'
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

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
</style>
