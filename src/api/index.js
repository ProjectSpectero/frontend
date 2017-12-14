import axios from 'axios'
import { getCookie, removeCookie } from 'tiny-cookie'

export default {
  function (method, path, data, success, error) {
    axios({
      method: method,
      baseURL: `${process.env.DAEMON_HTTPS ? 'https://' : 'http://'}${process.env.DAEMON_ENDPOINT ? process.env.DAEMON_ENDPOINT : 'localhost'}${process.env.DAEMON_PORT ? ':' + process.env.DAEMON_PORT : ''}/v1`,
      headers: {
        Authorization: getCookie('SPECTERO_AUTH') !== null ? `Bearer ${getCookie('SPECTERO_AUTH')}` : null
      },
      url: path,
      data: data
    })
    .then(r => {
      success(r)
    })
    .catch(e => {
      // Remove authorization cookie if 401 returned by any API call
      if (e.response.status === 401 && getCookie('SPECTERO_AUTH') !== null) {
        removeCookie('SPECTERO_AUTH')
      }

      error(e.response)
    })
  }
}
