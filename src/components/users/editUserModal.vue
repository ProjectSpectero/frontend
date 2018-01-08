<template>
  <modal name="editUser" :adaptive="true" height="auto" width="500px" :scrollable="true" :clickToClose="false" @before-open="beforeOpen">
    <button class="modal-close" @click.prevent="hide"></button>
    <div class="modal-title">
      <div class="modal-title-icon"><span class="icon icon-pencil"></span></div>
      <h2>Edit user</h2>
    </div>

    <form id="editUserForm">
      <div class="message error" v-if="formError">{{ formError }}</div>
      <div class="input" :class="{'hasError': errors.has('authKey')}">
        <input type="text" v-model="authKey" name="authKey" :disabled="formDisable" v-validate="rules.authKey" data-vv-as="username">
        <span class="floating-label">Username</span>
        <span v-show="errors.has('authKey')" class="errorLabel">{{ errors.first('authKey') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('password')}">
        <input type="password" v-model="password" name="password" :disabled="formDisable" v-validate="rules.password" data-vv-as="password">
        <span class="floating-label">Password</span>
        <small>Leave password blank if no change needed.</small>
        <span v-show="errors.has('password')" class="errorLabel">{{ errors.first('password') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('email')}">
        <input type="email" v-model="emailAddress" name="email" :disabled="formDisable" v-validate="rules.emailAddress" placeholder="example@spectero.com" data-vv-as="email">
        <span class="floating-label">Email</span>
        <span v-show="errors.has('email')" class="errorLabel">{{ errors.first('email') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('fullName')}">
        <input type="text" v-model="fullName" name="fullName" :disabled="formDisable" v-validate="rules.fullName" data-vv-as="display name">
        <span class="floating-label">Display Name</span>
        <span v-show="errors.has('fullName')" class="errorLabel">{{ errors.first('fullName') }}</span>
      </div>

      <div class="input" :class="{'hasError': errors.has('permissions')}">
        <span class="floating-label">Permissions</span>
        <div class="inputContentWrapper">
          <div class="checkbox" v-for="permission in allowedPermissions" v-bind:key="permission.id" v-bind:class="{ disabled: permission.disabled }">
            <input type="checkbox" v-bind:id="permission.id" v-bind:value="permission.id" v-bind:disabled="permission.disabled" v-model="roles">
            <label v-bind:for="permission.id">{{ permission.label }}
              <small v-if="permission.disabled">Can't set</small>
            </label>
          </div>
        </div>
      </div>

      <button class="alt green" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">
        {{ formDisable ? 'Please Wait' : 'Save Changes' }}
      </button>
      <button class="alt light right" @click.prevent="hide">Cancel</button>
    </form>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import user from '../../api/user.js'

  export default {
    data () {
      return {
        user: {},
        authKey: null,
        password: null,
        emailAddress: null,
        fullName: null,
        roles: [],
        formError: null,
        formDisable: false
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'auth/currentUser',
        isSuperAdmin: 'auth/isSuperAdmin',
        rules: 'users/editRules'
      }),
      allowedPermissions () {
        let permissions = [
          { id: 'SuperAdmin', label: 'SuperAdmin' },
          { id: 'WebApi', label: 'WebApi' },
          { id: 'HTTPProxy', label: 'HTTPProxy' },
          { id: 'OpenVPN', label: 'OpenVPN' },
          { id: 'ShadowSOCKS', label: 'ShadowSOCKS' },
          { id: 'SSHTunnel', label: 'SSHTunnel' }
        ]

        if (!this.isSuperAdmin) { // Disable SuperAdmin and WebApi checkboxes if not SuperAdmin 
          permissions[0].disabled = true // SuperAdmin
          permissions[1].disabled = true // WebApi
        }

        return permissions
      }
    },
    methods: {
      ...mapActions({
        syncCurrentUser: 'auth/syncCurrentUser',
        fetchUsers: 'users/fetch'
      }),
      beforeOpen (event) {
        this.reset()
        this.user = event.params.user
        this.authKey = this.user.authKey
        this.emailAddress = this.user.emailAddress
        this.fullName = this.user.fullName
        this.roles = this.user.roles
      },
      hide () {
        this.$modal.hide('editUser')
      },
      submit () {
        this.formError = null

        this.errors.clear()

        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.formError = this.$i18n.t(`errors.VALIDATION_FAILED`)
            return
          }

          this.formDisable = true // Disable form while HTTP request being made

          user.edit({
            data: {
              id: this.user.id,
              authKey: this.authKey,
              password: this.password,
              emailAddress: this.emailAddress,
              fullName: this.fullName,
              roles: this.roles
            },
            success: (response) => {
              // Update user in store if user updating themselves
              if (this.user.id === this.currentUser.id) {
                this.syncCurrentUser({ self: this })
              }

              this.formError = null
              this.fetchUsers({ self: this }) // Re-fetch users store to reflect user updates
              this.$modal.hide('editUser')
              this.reset()
            },
            fail: (err) => {
              this.formDisable = false // Here otherwise $validator won't allow you to act on disabled inputs
              
              // Get first error key to display main error msg
              for (var errorKey in err.errors) {
                if (err.errors.hasOwnProperty(errorKey)) {
                  this.formError = this.$i18n.t(`errors.${errorKey}`)
                  break // Only want the first element key
                }
              }
              
              // Inject errors into form fields
              for (var inputName in err.fields) {
                if (err.fields.hasOwnProperty(inputName)) {
                  let inputErrors = err.fields[inputName]
                  for (var errorKey in inputErrors) {
                    if (inputErrors.hasOwnProperty(errorKey)) {
                      this.$validator.errors.add(inputName, this.$i18n.t(`errors.${errorKey}`, null, { x: inputErrors[errorKey] }))
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