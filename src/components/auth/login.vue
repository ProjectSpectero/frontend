<template>
  <div>
    <form id="loginForm">
      <div class="message info" v-if="!formError && this.$route.query.redirect">Please log in to continue.</div>
      <div class="message error" v-if="formError">
        {{ formError }}
      </div>
      <div class="input-container">
        <input type="text" class="input full-width" v-model="authKey" name="authKey" :disabled="formDisable" placeholder="Username" v-validate="'required'" data-vv-as="username" :class="{'input-error': errors.has('authKey')}">
        <span v-show="errors.has('authKey')" class="input-error-msg">
          {{ errors.first('authKey') }}
        </span>
      </div>
      <div class="input-container">
        <input type="password" class="input full-width" v-model="password" name="password" :disabled="formDisable" placeholder="Password" v-validate="'required'" data-vv-as="password" :class="{'input-error': errors.has('password')}">
        <span v-show="errors.has('password')" class="input-error-msg">
          {{ errors.first('password') }}
        </span>
      </div>
      <button class="button button-success full-width" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">{{ formDisable ? 'Please Wait' : 'Log In' }}</button>
    </form>
  </div>
</template>

<script>
  import auth from '@/api/auth.js'

  export default {
    data () {
      return {
        authKey: null,
        password: null,
        formError: null,
        formDisable: false
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
          auth.login({
            data: {
              authKey: parent.authKey,
              password: parent.password
            },
            loginSuccess (msg) {
              parent.formError = null
              if (parent.$route.query.redirect) {
                parent.$router.push({ path: parent.$route.query.redirect })
              } else {
                parent.$router.push({ name: 'dashboard' })
              }
            },
            loginFailed (err) {
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
    },
    metaInfo: {
      title: 'Login'
    }
  }
</script>

<style lang="scss" scoped>

</style>