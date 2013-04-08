
var n = 'rc'+Math.random()
var assert = require('assert')

process.argv.push('--config.foo=bar');
process.env[n+'_envOption'] = 42

var config = require('./')(n, {
  option: true
})

console.log(config)

assert.equal(config.option, true)
assert.equal(config.envOption, 42)
assert(!config.hasOwnProperty('config'));
assert.equal(config.foo, 'bar')

// ---

config = require('./')(n, {
  foo: 'baz'
})

console.log(config)
assert(!config.hasOwnProperty('config'));
assert.equal(config.foo, 'bar')