#! /usr/bin/env node
var cc   = require('./lib/utils')
var join = require('path').join
var deepExtend = require('deep-extend')
var etc = '/etc'
var win = process.platform === "win32"
var home = win
           ? process.env.USERPROFILE
           : process.env.HOME

module.exports = function (name, defaults, argv, parsers) {
  if('string' !== typeof name)
    throw new Error('rc(name): name *must* be string')
  if(!argv)
    argv = require('minimist')(process.argv.slice(2))
  defaults = (
      'string' === typeof defaults
    ? cc.json(defaults) : defaults
    ) || {}

  parsers = parsers || cc.parsers

  var env = cc.env(name + '_')
  var configs = [defaults]
  var configFiles = []
  function addConfigFile (file) {
    if (configFiles.indexOf(file) >= 0) return
    var fileConfig = cc.file(file)
    if (fileConfig) {
      configs.push(cc.parse(fileConfig, file, parsers))
      configFiles.push(file)
    }
  }

  // which files do we look at?
  if (!win)
   [join(etc, name, 'config')].concat(Object.keys(parsers).map(function (v) {
     return [etc, '.' + name + 'rc.' + v.toLowerCase()]
   })).forEach(addConfigFile)
  if (home)
   [join(home, '.config', name, 'config'),
    join(home, '.config', name),
    join(home, '.' + name, 'config')].concat(Object.keys(parsers).map(function (v) {
      return [home, '.' + name + 'rc.' + v.toLowerCase()]
    })).forEach(addConfigFile)
  Object.keys(parsers).map(function (v) {
    return v.toLowerCase();
  }).forEach(function (v) {
    addConfigFile(cc.find('.' + name + 'rc' + (v ? '.' + v : '')))
  })
  if (env.config) addConfigFile(env.config)
  if (argv.config) addConfigFile(argv.config)
  
  return deepExtend.apply(null, configs.concat([
    env,
    argv,
    configFiles.length ? {configs: configFiles, config: configFiles[configFiles.length - 1]} : undefined,
  ]))
}

if(!module.parent) {
  console.log(
    JSON.stringify(module.exports(process.argv[2]), false, 2)
  )
}
