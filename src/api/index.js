import Vue from 'vue'
import axios from 'axios'
import ip from 'ip'
import { getCookie, removeCookie } from 'tiny-cookie'
import Err from '../modules/error.js'

/**
 * API wrapper for making various calls from sub-wrappers.
 *
 * @param {String}   method  HTTP method (ie: GET, POST, PUT, DELETE)
 * @param {String}   path    API endpoint path
 * @param {Object}   data    Form data for submit
 * @param {Function} success Callback to be called on method success
 * @param {Function} failed  Callback to be called on method fail
 */
export default function (method, path, data, success, failed) {
  const protocol = process.env.DAEMON_HTTPS ? 'https://' : location.protocol + '//'
  const endpoint = process.env.DAEMON_ENDPOINT ? process.env.DAEMON_ENDPOINT : location.hostname
  const version = process.env.DAEMON_VERSION
  let port = location.port ? ':' + location.port : ''

  // Allowing a default empty port to be specified
  if (process.env.DAEMON_PORT !== undefined) {
    port = process.env.DAEMON_PORT ? ':' + process.env.DAEMON_PORT : ''
  }

  const url = protocol + endpoint + port + '/v' + version

  Vue.prototype.$Progress.start()

  console.log(url)

  axios({
    method: method,
    baseURL: url,
    headers: {
      Authorization: getCookie('SPECTERO_AUTH') !== null ? `Bearer ${getCookie('SPECTERO_AUTH')}` : null
    },
    url: path,
    data: data.data
  }).then(response => {
    Vue.prototype.$Progress.finish()

    if (typeof success === 'function') { // Main api callback
      success(response)
    }
    if (typeof data.success === 'function') { // Sub-wrapper callback
      data.success(response)
    }

    return { error: false, data: response }
  }).catch(error => {
    Vue.prototype.$Progress.finish()

    console.log(error)
    error = error.response

    // Remove authorization cookie if 401 returned by any API call
    if (error.status === 401 && getCookie('SPECTERO_AUTH') !== null) {
      removeCookie('SPECTERO_AUTH')
    }

    let err = new Err(error.data.errors)

    if (typeof failed === 'function') { // Main api callback

      failed(err)
    }
    if (typeof data.fail === 'function') { // Sub-wrapper callback
      data.fail(err)
    }

    return { error: true, data: err }
  })
}
