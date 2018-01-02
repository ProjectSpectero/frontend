import api from './index.js'
import { setCookie, getCookie, removeCookie } from 'tiny-cookie'
import jwtDecode from 'jwt-decode'
import claimtypes from 'claimtypes'

/**
 * Returns parsed JWT from SPECTERO_AUTH cookie.
 * 
 * On error, returns Object with error key and deletes cookie (if any).
 * 
 * @param {String} jwt JWT token to validate (uses auth cookie if null)
 */
let parseJWT = function (jwt) {
  try {
    let token = jwt ? jwt : getCookie('SPECTERO_AUTH')
    let decode = jwtDecode(token)
    return {
      token: token,
      exp: decode.exp,
      data: JSON.parse(decode[claimtypes.microsoft.userData]),
      error: null
    }
  }
  catch (err) {
    removeCookie('SPECTERO_AUTH')
    return { error: err }
  }
}

/**
 * Verifies current JWT token in cookies and user object in vuex store.
 */
let checkLogin = function() {
  let jwt = parseJWT()
  return jwt.error !== null ? false : jwt
}

/**
 * Authenticates user with credentials.
 * 
 * @param {String} authKey  Username or email for user to authenticate.
 * @param {String} password Password for user to authenticate.
 */
let login = function (options) {
  return api('POST', `/auth`, options, 
    function (response) {
      let data = response.data

      // Login successful, JWT token issued
      if (data.message === 'JWT_TOKEN_ISSUED') {
        let jwt = parseJWT(data.result)
        setCookie('SPECTERO_AUTH', data.result, { expires: new Date(jwt.exp * 1000).toGMTString() })
        return options.loginSuccess(jwt)
      }

      // 200 status code recieved, but JWT token wasn't issued
      return options.loginFailed(`Unknown error occurred.`)
    },
    function (error) {
      if (error === undefined) {
        return options.loginFailed(`Unknown error occurred.`)
      }
      return options.loginFailed(error)
    }
  )
}

export default {
  parseJWT,
  checkLogin,
  login,
}
