
var argv = require('optimist').argv
var cc   = require('config-chain')
var join = require('path').join
var deepExtend = require('deep-extend')
var etc = '/etc'
var win = process.platform === "win32"
var home = win
           ? process.env.USERPROFILE
           : process.env.HOME

module.exports = function (name, defaults) {
  if(!name)
    throw new Error('nameless configuration fail')


  return deepExtend.apply(null, [
    typeof defaults === 'string' ? cc.json(defaults) : defaults,
    win ? {} : cc.json(join(etc, name, 'config')),
    win ? {} : cc.json(join(etc, name + 'rc')),
    cc.json(join(home, '.config', name, 'config')),
    cc.json(join(home, '.config', name)),
    cc.json(join(home, '.' + name, 'config')),
    cc.json(join(home, '.' + name + 'rc')),
    cc.json(argv.config),
    cc.env(name + '_'),
    argv
  ])
}
