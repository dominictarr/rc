#! /usr/bin/env node
var cc   = require('./lib/utils')
var join = require('path').join
var deepExtend = require('deep-extend')
var etc = '/etc'
var win = process.platform === "win32"
var home = win
           ? process.env.USERPROFILE
           : process.env.HOME

module.exports = function (name, defaults, argv, parse) {
  if('string' !== typeof name)
    throw new Error('rc(name): name *must* be string')
  if(!argv)
    argv = require('minimist')(process.argv.slice(2))
  defaults = (
      'string' === typeof defaults
    ? cc.json(defaults) : defaults
    ) || {}

  parse = parse || cc.parse

  function file () {
    var content = cc.file.apply(null, arguments)
    return content ? parse(content) : null
  }

  var local = cc.find('.'+name+'rc')

  var env = cc.env(name + '_')

  return deepExtend.apply(null, [
    defaults,
    win ? {} : file(join(etc, name, 'config')),
    win ? {} : file(join(etc, name + 'rc')),
    home ? file(join(home, '.config', name, 'config')) : {},
    home ? file(join(home, '.config', name)) : {},
    home ? file(join(home, '.' + name, 'config')) : {},
    home ? file(join(home, '.' + name + 'rc')) : {},
    file(local),
    local ? {config: local} : null,
    env.config ? file(env.config) : null,
    argv.config ? file(argv.config) : null,
    env,
    argv
  ])
}

if(!module.parent) {
  console.log(
    JSON.stringify(module.exports(process.argv[2]), false, 2)
  )
}
