var assert = require('assert')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

// plain --config
var config = require('../')('rc' + 1, null, { 
  config: __dirname + '/fixtures/config.json' 
})

console.log('Without providing --rcconfig, config is used:')
inspect(config)
assert.equal(config.name, 'config')

// more specific --rcconfig
config = require('../')('rc' + 1, null, { 
  config: __dirname + '/fixtures/config.json',
  rcconfig: __dirname + '/fixtures/rcconfig.json' 
})

console.log('When providing --rcconfig, rcconfig is used instead of config:')
inspect(config)
assert.equal(config.name, 'rcconfig')
