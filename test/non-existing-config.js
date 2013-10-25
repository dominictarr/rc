var assert = require('assert')

// --config pointing to a file that doesn't exists
var error
var path = __dirname + '/fixtures/doesnotexist.json'  

try {
  var config = require('../')('rc' + 1, null, { 
    config: path
  })
} catch (err) {
  error = err
}

console.log('--config pointing to non-existing path throws');
assert.ok(error, 'throws error')
assert.equal(error.message, 'The provided config file ' + path + ' does not exist.', 'with helpful message')
