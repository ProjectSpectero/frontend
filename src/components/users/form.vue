<template>
  <form>
    <div class="message error" v-if="formError">{{ formError }}</div>

    <div v-for="field in formFields" :key="field.name" class="input" :class="{'hasError': errors.has(field.model)}">
      <input :type="field.type" v-model="form[field.model]" :disabled="formDisable" v-validate="rules[field.model]" :data-vv-as="field.as">
      <span class="floating-label">{{ field.label }}</span>
      <span v-show="errors.has(field.model)" class="errorLabel">{{ errors.first(field.model) }}</span>
    </div>

    <div class="input" :class="{'hasError': errors.has('permissions')}">
      <span class="floating-label">Permissions</span>
      <div class="inputContentWrapper">
        <div class="checkbox" v-for="permission in allowedPermissions" v-bind:key="permission.id" v-bind:class="{ disabled: permission.disabled }">
          <input type="checkbox" v-bind:id="permission.id" v-bind:value="permission.id" v-bind:disabled="permission.disabled" v-model="form.roles">
          <label v-bind:for="permission.id">{{ permission.label }}<small v-if="permission.disabled">Can't set</small></label>
        </div>
      </div>
    </div>

    <button class="alt green" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">
      {{ formDisable ? 'Please wait...' : title }}
    </button>
    <button class="alt light right" @click.prevent="hide">
      Cancel
    </button>
  </form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import user from '../../api/user.js'

  export default {
    props: {
      action: {
        type: String,
        default: 'edit'
      },
      modalName: String
    },
    data () {
      return {
        title: 'Edit User',
        formError: null,
        formDisable: false,
        formFields: {},
        form: {
          authKey: null,
          password: null,
          emailAddress: null,
          fullName: null,
          roles: []
        }
      }
    },
    created () {
      this.setup()
    },
    computed: {
      ...mapGetters({
        isSuperAdmin: 'auth/isSuperAdmin',
        rules: 'users/createRules'
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
        fetchUsers: 'users/fetch'
      }),
      setup () {
        // Switch between edit and create mode if needed.
        // The component defaults to edit mode - we just need to switch when we're creating a new user.
        if (this.action === 'create') {
          this.title = 'Add User'
          this.modalName = 'addUser'
        }

        // Set up basic form fields to avoid code repetition
        this.formFields = [
          { label: 'Username', type: 'text', model: 'authKey', name: 'username', as: 'username' },
          { label: 'Password', type: 'password', model: 'password', name: 'password', as: 'password' },
          { label: 'Email', type: 'email', model: 'emailAddress', name: 'emailAddress', as: 'emailAddress' },
          { label: 'Display Name', type: 'text', model: 'fullName', name: 'fullName', as: 'display name' }
        ]
      },
      hide () {
        this.$emit('closeModal')
      },
      submit () {
        this.formError = null
        this.errors.clear()

        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.formError = this.$i18n.t(`errors.VALIDATION_FAILED`)
            return
          }

          // Disable form while HTTP request being made
          this.formDisable = true

          // Handle submission according to chosen action
          if (this.action === 'create') {
            this.create()
          }
          else {
            this.update()
          }
        })
      },
      create () {
        user.create({
          data: this.form,
          success: (response) => {
            this.dealWithSuccess(response)
          },
          fail: (err) => {
            this.dealWithErrors(err)
          }
        })
      },
      update () {
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
            this.hide()
            this.reset()
          },
          fail: (err) => {
            
          }
        })
      },
      dealWithSuccess (response) {
        this.formError = null
        this.fetchUsers({ self: this })
        this.$modal.hide(this.modalName)
        this.reset()
      },
      dealWithErrors (err) {
        // Here otherwise $validator won't allow you to act on disabled inputs
        this.formDisable = false 

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
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>