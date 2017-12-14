import api from './index.js'

export default {
  /**
   * List all users.
   */
  list: function (options) {
    return api('GET', `/user`, options)
  },

  /**
   * Returns one user by user id.
   * 
   * @param {Integer} id ID pertaining to user being requested.
   */
  get: function (options) {
    return api('GET', `/user/${options.id}`, options)
  },

  /**
   * Creates user from given parameters.
   * 
   * @param {String} authKey  Username.
   * @param {String} password Password.
   * @param {Array}  roles    Array of roles to assign ([] for no roles).
   * @param {String} cert     n/a
   * @param {String} cartKey  n/a
   */
  create: function (options) {
    return api('POST', `/user`, options)
  },

  /**
   * Edit a users details.
   * 
   * @param {Integer} id       User id to edit.
   * 
   * @param {String}  authKey  Username.
   * @param {String}  password Password.
   * @param {Array}   roles    Array of roles to assign ([] for no roles).
   * @param {String}  cert     n/a
   * @param {String}  cartKey  n/a
   */
  edit: function (options) {
    return api('PUT', `/user/${options.id}`, options)
  },

  /**
   * Delete a user at given id.
   * 
   * @param {Integer} id User id to delete.
   */
  delete: function (options) {
    return api('DELETE', `/user/${options.id}`, options)
  }
}