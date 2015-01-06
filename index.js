#! /usr/bin/env node
var cc   = require('./lib/utils')
var join = require('path').join
var deepExtend = require('deep-extend')
var etc = '/etc'
var win = process.platform === "win32"
var home = win
           ? process.env.USERPROFILE
           : process.env.HOME

module.exports = function (name, defaults, argv) {
  var files = []

  if('string' !== typeof name)
    throw new Error('rc(name): name *must* be string')
  if(!argv)
    argv = require('minimist')(process.argv.slice(2))
  defaults = (
      'string' === typeof defaults
    ? cc.json(files, defaults) : defaults
    ) || {}

  var local = cc.find('.'+name+'rc')

  var env = cc.env(name + '_')

  var conf = deepExtend.apply(null, [
    defaults,
    win ? {} : cc.json(files, join(etc, name, 'config')),
    win ? {} : cc.json(files, join(etc, name + 'rc')),
    home ? cc.json(files, join(home, '.config', name, 'config')) : {},
    home ? cc.json(files, join(home, '.config', name)) : {},
    home ? cc.json(files, join(home, '.' + name, 'config')) : {},
    home ? cc.json(files, join(home, '.' + name + 'rc')) : {},
    cc.json(files, local),
    local ? {config: local} : null,
    env.config ? cc.json(files, env.config) : null,
    argv.config ? cc.json(files, argv.config) : null,
    env,
    argv
  ])

  // reverse the file list to be more in line with the readme
  // i.e. so early entries in the list would have overridden later ones
  files.reverse()

  Object.defineProperty(conf, '_rcfiles', {
    value: files
  })

  return conf
}

if(!module.parent) {
  console.log(
    JSON.stringify(module.exports(process.argv[2]), false, 2)
  )
}
