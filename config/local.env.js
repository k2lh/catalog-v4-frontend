'use strict'
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"local"',
  VUE_APP_ENV_NAME: '"local"',
  BASE_URL: '"http://localhost:8080/"',  
  ROOT_API: '"http://localhost:3000/api"'
})
