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
        <input type="text" v-model="authKey" name="authKey" :disabled="formDisable" v-validate="usernameRules" data-vv-as="username">
        <span class="floating-label">Username</span>
        <span v-show="errors.has('authKey')" class="errorLabel">{{ errors.first('authKey') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('password')}">
        <input type="password" v-model="password" name="password" :disabled="formDisable" v-validate="'min:5|max:72'" data-vv-as="password">
        <span class="floating-label">Password</span>
        <small>Leave password blank if no change needed.</small>
        <span v-show="errors.has('password')" class="errorLabel">{{ errors.first('password') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('email')}">
        <input type="email" v-model="email" name="email" :disabled="formDisable" v-validate="'required|email'" placeholder="example@spectero.com" data-vv-as="email">
        <span class="floating-label">Email</span>
        <span v-show="errors.has('email')" class="errorLabel">{{ errors.first('email') }}</span>
      </div>
      <div class="input" :class="{'hasError': errors.has('fullName')}">
        <input type="text" v-model="fullName" name="fullName" :disabled="formDisable" v-validate="'max:50'" data-vv-as="display name">
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
        email: null,
        fullName: null,
        roles: [],
        formError: null,
        formDisable: false
      }
    },
    computed: {
      ...mapGetters([
        'usernameRules'
      ]),
      currentUserIsSuperAdmin () {
        return this.$store.getters.currentUserRoles.indexOf('SuperAdmin') > -1
      },
      allowedPermissions () {
        let permissions = [
          { id: 'SuperAdmin', label: 'SuperAdmin' },
          { id: 'WebApi', label: 'WebApi' },
          { id: 'HTTPProxy', label: 'HTTPProxy' },
          { id: 'OpenVPN', label: 'OpenVPN' },
          { id: 'ShadowSOCKS', label: 'ShadowSOCKS' },
          { id: 'SSHTunnel', label: 'SSHTunnel' }
        ]

        if (!this.currentUserIsSuperAdmin) { // Disable SuperAdmin and WebApi checkboxes if not SuperAdmin 
          permissions[0].disabled = true // SuperAdmin
          permissions[1].disabled = true // WebApi
        }

        return permissions
      }
    },
    methods: {
      beforeOpen (event) {
        this.reset()
        this.user = event.params.user
        this.authKey = this.user.authKey
        this.email = this.user.emailAddress
        this.fullName = this.user.fullName
        this.roles = this.user.roles
      },
      hide () {
        this.$modal.hide('editUser')
      },
      submit () {
        let parent = this
        parent.formError = null
        parent.errors.clear()
        parent.$validator.validateAll().then((result) => {
          if (!result) {
            parent.formError = parent.$i18n.t(`errors.VALIDATION_FAILED`)
            return
          }
          parent.formDisable = true // Disable form while HTTP request being made
          user.edit({
            data: {
              id: parent.user.id,
              authKey: parent.authKey,
              password: parent.password,
              emailAddress: parent.email,
              fullName: parent.fullName,
              roles: parent.roles
            },
            success (msg) {
              // Update user in store if user updating themselves
              if (parent.user.id === parent.$store.getters.currentUser.id) {
                parent.$store.dispatch('syncCurrentUser', { self: this })
              }
              parent.formError = null
              parent.$store.dispatch('fetchUsers', { self: this }) // Re-fetch users store to reflect user updates
              parent.$modal.hide('editUser')
              parent.reset()
            },
            fail (err) {
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