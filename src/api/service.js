import api from './index.js'

export default {
  /**
   * List services and statuses.
   */
  list: function (options) {
    return api('GET', `/service`, options)
  },

  /**
   * View service config for a given service name.
   * 
   * @param {String} name Service name to query.
   */
  get: function (options) {
    return api('GET', `/service/${options.name}/config`, options)
  },

  /**
   * Update service config for a given service name.
   * 
   * @param {String} name Service name to query.
   * 
   * @param {Array}  listeners
   * @param {Array}  allowedDomains
   * @param {Array}  bannedDomains
   * @param {String} proxyMode
   */
  update: function (options) {
    return api('PUT', `/service/${options.name}/config`, options)
  },

  /**
   * Manage service
   * 
   * @param {String} name   Service name to query.
   * @param {String} action Action to perform to service (action name).
   */
  manage: function (options) {
    return api('PUT', `/service/${options.name}/${options.action}`, options)
  }
}