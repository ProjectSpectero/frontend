<template>
  <div id="login">
		<div id="mainContainer">
      <div id="authContainer">
        <div id="logo"><img src="~@/assets/img/logo.svg"></div>
        <div id="authContent">
          <!-- <h1>Log In</h1> -->
          <form id="loginForm">
            <div class="message info" v-if="!formError && this.$route.query.redirect">Please log in to continue.</div>
            <div class="message error" v-if="formError">{{ formError }}</div>
            <div class="input" :class="{'hasError': errors.has('username')}">
              <input type="text" v-model="username" name="username" :disabled="formDisable" placeholder="Username" v-validate="'required'" data-vv-as="username">
              <span v-show="errors.has('username')" class="errorLabel">{{ errors.first('username') }}</span>
            </div>
            <div class="input" :class="{'hasError': errors.has('password')}">
              <input type="password" v-model="password" name="password" :disabled="formDisable" placeholder="Password" v-validate="'required'" data-vv-as="password">
              <span v-show="errors.has('password')" class="errorLabel">{{ errors.first('password') }}</span>
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
  import auth from '../api/auth.js'

  export default {
    name: 'login',
    metaInfo: {
      title: 'Login'
    },
    data: function () {
      return {
        username: null,
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
            parent.formError = 'Please correct any errors and try again.'
            return
          }
          parent.formDisable = true // Disable form while HTTP request being made
          auth.login({
            data: {
              authKey: parent.username,
              password: parent.password
            },
            loginSuccess: function (msg) {
              parent.formError = null
              if (parent.$route.query.redirect) {
                parent.$router.push({ path: parent.$route.query.redirect })
              } else {
                parent.$router.push({ name: 'dashboard' })
              }
            },
            loginFailed: function (err) {
              // parent.formError = err
              parent.formDisable = false
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

<style lang="scss" scoped>
@import '../assets/styles/_vars.scss';

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

  // h1 {
  //   display: block;
  //   margin-bottom: 20px;
  //   font-size: 18px;
  //   font-weight: 700;
  //   text-transform: uppercase;
  //   text-align: center;
  // }
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
