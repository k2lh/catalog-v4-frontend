'use strict'
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  VUE_APP_ENV_NAME: '"staging"',
  ROOT_API: '"/api"',
  BASE_URL: '"https://site-staging.domain.net/"'
})
