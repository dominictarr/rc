
var argv = require('optimist').argv
var cc   = require('config-chain')
var join = require('path').join
var etc = '/etc'
var home = process.platform === "win32"
           ? process.env.USERPROFILE
           : process.env.HOME

module.exports = function (name, defaults) {
  if(!name)
    throw new Error('nameless configuration fail')

  return cc(
    argv,
    cc.env(name + '_'),
    argv.config,
    join(home, '.' + name + 'rc'),
    join(home, '.' + name, 'config'),
    join(home, '.config', name),
    join(home, '.config', name, 'config'),
    join(etc, name + 'rc'),
    join(etc, name, 'config'),
    defaults
  ).snapshot

}
