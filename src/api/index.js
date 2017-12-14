import axios from 'axios'
import { getCookie, removeCookie } from 'tiny-cookie'

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
  axios({
    method: method,
    baseURL: `${process.env.DAEMON_HTTPS ? 'https://' : 'http://'}${process.env.DAEMON_ENDPOINT ? process.env.DAEMON_ENDPOINT : 'localhost'}${process.env.DAEMON_PORT ? ':' + process.env.DAEMON_PORT : ''}/v1`,
    headers: {
      Authorization: getCookie('SPECTERO_AUTH') !== null ? `Bearer ${getCookie('SPECTERO_AUTH')}` : null
    },
    url: path,
    data: data
  })
  .then(response => {
    
    // Run success callback, if any
    if ( typeof success === 'function' ) {
      success(response)
    }

    return { error: false, data: response }
  })
  .catch(error => {
    
    // Remove authorization cookie if 401 returned by any API call
    if (error.response.status === 401 && getCookie('SPECTERO_AUTH') !== null) {
      removeCookie('SPECTERO_AUTH')
    }
    
    // Run fail callback, if any
    if ( typeof failed === 'function' ) {
      failed(error.response)
    }

    return { error: true, data: error.response }
  })
}
