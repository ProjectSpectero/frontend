import api from './index.js'
import { setCookie, getCookie, removeCookie } from 'tiny-cookie'
import jwtDecode from 'jwt-decode'
import claimtypes from 'claimtypes'

/**
 * Returns parsed JWT from SPECTERO_AUTH cookie.
 * 
 * On error, returns Object with error key and deletes cookie (if any).
 */
let parseJWT = function (jwt) {
  try {
    let decode = jwtDecode(jwt ? jwt : getCookie('SPECTERO_AUTH'))
    return {
      exp: decode.exp,
      id: decode[claimtypes.microsoft.userData],
      username: decode[claimtypes.name]
    }
  }
  catch (err) {
    removeCookie('SPECTERO_AUTH')
    return { error: err }
  }
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
        return options.success(jwt)
      }

      // 200 status code recieved, but JWT token wasn't issued
      return options.fail(`Unknown error occurred.`)
    },
    function (error) {
      if (error === undefined) {
        return options.fail(`Unknown error occurred.`)
      }

      let errorMsg = null

      switch (error.data.errors[0]) {
        case 'MISSING_BODY':
          errorMsg = `Missing username or password.`
          break
        case 'USER_NOT_FOUND':
        case 'MISSING_OR_INVALID_PASSWORD':
        case 'AUTHENTICATION_FAILED':
          errorMsg = `Invalid username or password.`
          break
        default:
          errorMsg = `Unknown error occurred.`
      }

      return options.fail(errorMsg)
    }
  )
}

export default {
  login,
  parseJWT
}
