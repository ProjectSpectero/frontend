<template>
  <modal name="addUser" :adaptive="true" height="auto" width="500px" :scrollable="true" :clickToClose="false">
    <button class="modal-close" @click.prevent="$modal.hide('addUser')"></button>
    <div class="modal-title">
      <div class="modal-title-icon green"><span class="icon icon-users"></span></div>
      <h2>Add new user</h2>
    </div>
    <form id="addUserForm">
      <div class="message error" v-if="formError">{{ formError }}</div>
      <div class="input" :class="{'hasError': errors.has('authKey')}">
        <input type="text" v-model="authKey" name="authKey" :disabled="formDisable" v-validate="'required'" data-vv-as="username">
        <span class="floating-label">Username</span>
        <span v-show="errors.has('authKey')" class="errorLabel">{{ errors.first('authKey') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('password')}">
        <input type="password" v-model="password" name="password" :disabled="formDisable" v-validate="'required'" data-vv-as="password">
        <span class="floating-label">Password</span>
        <span v-show="errors.has('password')" class="errorLabel">{{ errors.first('password') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('email')}">
        <input type="email" v-model="email" name="email" :disabled="formDisable" v-validate="'required|email'" placeholder="example@spectero.com" data-vv-as="email">
        <span class="floating-label">Email</span>
        <span v-show="errors.has('email')" class="errorLabel">{{ errors.first('email') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('fullName')}">
        <input type="text" v-model="fullName" name="fullName" :disabled="formDisable" data-vv-as="display name">
        <span class="floating-label">Display Name</span>
        <span v-show="errors.has('fullName')" class="errorLabel">{{ errors.first('fullName') }}</span>
      </div>
      <treeselect v-model="permissions" :multiple="true" :options="permissionOptions" placeholder="Select user permission(s)" />
      <pre class="result">Permissions selected (not submitted yet):<br>{{ permissions }}</pre>
      <button class="alt green" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">{{ formDisable ? 'Please Wait' : 'Add User' }}</button>
      <button class="alt light right" @click.prevent="$modal.hide('addUser')">Cancel</button>
    </form>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Treeselect from '@riophae/vue-treeselect'
  import user from '../../api/user.js'

  export default {
    name: 'add-user-modal',
    components: {
      Treeselect
    },
    data: function () {
      return {
        authKey: null,
        password: null,
        email: null,
        fullName: null,
        permissions: null,
        formError: null,
        formDisable: false,
        permissionOptions: [ 
          {
            id: 'SuperAdmin',
            label: 'SuperAdmin'
          }, {
            id: 'WebApi',
            label: 'WebApi'
          }, {
            id: 'HTTPProxy',
            label: 'HTTPProxy'
          }, {
            id: 'OpenVPN',
            label: 'OpenVPN'
          }, {
            id: 'ShadowSOCKS',
            label: 'ShadowSOCKS'
          }, {
            id: 'SSHTunnel',
            label: 'SSHTunnel'
          }
        ]
      }
    },
    methods: {
      submit () {
        let parent = this
        this.$validator.validateAll().then((result) => {
          if (!result) {
            parent.formError = parent.$i18n.t(`errors.VALIDATION_FAILED`)
            return
          }
          parent.formDisable = true // Disable form while HTTP request being made
          user.create({
            data: {
              authKey: parent.authKey,
              password: parent.password,
              emailAddress: parent.email,
              fullName: parent.fullName
            },
            success: function (msg) {
              parent.formError = null
              parent.$store.dispatch('fetchUsers', { self: this }) // Re-fetch users store to reflect user updates
              parent.$modal.hide('addUser')
              parent.reset()
            },
            fail: function (err) {
              parent.formDisable = false // Here otherwise $validator won't allow you to act on disabled inputs
              
              // Get first error key to display main error msg
              for (var errorKey in err.errors) {
                if (err.errors.hasOwnProperty(errorKey)) {
                  parent.formError = parent.$i18n.t(`errors.${errorKey}`)
                  break // Only want the first element key
                }
              }
              
              // Inject errors into form fields
              for (var inputName in err.fields) {
                if (err.fields.hasOwnProperty(inputName)) {
                  let inputErrors = err.fields[inputName]
                  for (var errorKey in inputErrors) {
                    if (inputErrors.hasOwnProperty(errorKey)) {
                      parent.$validator.errors.add(inputName, parent.$i18n.t(`errors.${errorKey}`, null, { x: inputErrors[errorKey] }))
                    }
                  }
                }
              }

            }
          })
        })
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
<style lang="scss">
  
</style>