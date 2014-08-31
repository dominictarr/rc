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
  if(!name)
    throw new Error('nameless configuration fail')
  if(!argv)
    argv = require('minimist')(process.argv.slice(2))
  defaults = (
      'string' === typeof defaults
    ? cc.json(defaults) : defaults
    ) || {}

  var local = cc.find('.'+name+'rc')

  return deepExtend.apply(null, [
    defaults,
    win ? {} : cc.json(join(etc, name, 'config')),
    win ? {} : cc.json(join(etc, name + 'rc')),
    home ? cc.json(join(home, '.config', name, 'config')) : {},
    home ? cc.json(join(home, '.config', name)) : {},
    home ? cc.json(join(home, '.' + name, 'config')) : {},
    home ? cc.json(join(home, '.' + name + 'rc')) : {},
    cc.json(argv.config || local),
    local ? {config: local} : null,
    cc.env(name + '_'),
    argv
  ])
}

if(!module.parent) {
  console.log(
    JSON.stringify(module.exports(process.argv[2]), false, 2)
  )
}
