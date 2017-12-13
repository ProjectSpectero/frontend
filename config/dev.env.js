'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  NODE_ENDPOINT: '"23.172.128.100"',
  NODE_PORT: '""'
})
