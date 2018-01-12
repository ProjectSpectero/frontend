const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DAEMON_ENDPOINT: '"23.172.128.100"',
  DAEMON_PORT: '""',
  DAEMON_VERSION: '"1"'
})
