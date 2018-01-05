<template>
  <div id="login">
		<div id="mainContainer">
      <div id="authContainer">
        <div id="logo"><img src="~@/assets/img/logo.svg"></div>
        <div id="authContent">
          <form id="loginForm">
            <div class="message info" v-if="!formError && this.$route.query.redirect">Please log in to continue.</div>
            <div class="message error" v-if="formError">
              {{ formError }}
            </div>

            <div class="input" :class="{'hasError': errors.has('authKey')}">
              <input type="text" v-model="authKey" name="authKey" :disabled="formDisable" placeholder="Username" v-validate="'required'" data-vv-as="username">
              <span v-show="errors.has('authKey')" class="errorLabel">
                {{ errors.first('authKey') }}
              </span>
            </div>
            <div class="input" :class="{'hasError': errors.has('password')}">
              <input type="password" v-model="password" name="password" :disabled="formDisable" placeholder="Password" v-validate="'required'" data-vv-as="password">
              <span v-show="errors.has('password')" class="errorLabel">
                {{ errors.first('password') }}
              </span>
            </div>
            <button class="lime" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">{{ formDisable ? 'Please Wait' : 'Log In' }}</button>
          </form>
        </div>
        <!-- <div id="authBottom">
          <a href="#">Don’t have an account? <strong>Create one now.</strong></a>
        </div> -->
      </div>
		</div>
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
@import '../../assets/styles/_vars.scss';

#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

#authContainer {
  width: 350px;

  #logo {
    display: block;
    margin-bottom: 20px;
    text-align: center;

    img {
      width: 175px;
      height: 25px;
      display: inline-block;
    }
  }
}

#authContent {
  width: 100%;
  background: rgba(0,0,0,0.2);
  padding: 20px;
  border-radius: 4px;
  text-align: left;

  button {
    margin-top: 20px;
    width: 100%;
    display: block;
    border-radius: 100px;
  }
  .message {
    text-align: center;
  }
  form {
    .input {
      padding-top: 0;
      margin-bottom: 10px;

      &.hasError {
        margin-bottom: 16px;
      }
    }
  }
}

// #authBottom {
//   font-size: 14px;
//   line-height: 14px;
//   text-align: center;
//   margin-top: 20px;

//   a {
//     color: rgba(255,255,255,0.6);

//     strong {
//       color: rgba(255,255,255,1);
//       font-weight: bold;
//     }
//   }
// }
</style>