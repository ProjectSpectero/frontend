const ip = require('ip')

module.exports = {
  NODE_ENV: '"production"',
  DAEMON_ENDPOINT: '"' + ip.address() + '"',
  DAEMON_PORT: '""',
  DAEMON_HTTPS: 'false',
  DAEMON_VERSION: '"1"'
}
