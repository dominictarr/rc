var fs = require('fs')
var path = require('path')
var n = 'rc'+Math.random()
var assert = require('assert')
var jsonrc = path.resolve('.' + n + 'rc')

fs.writeFileSync(jsonrc, [
  '{',
    '"option": false,',
    '"otherOption": 24',
  '}'
].join('\n'));

var config = require('../')(n)

fs.unlinkSync(jsonrc);

console.log('\n\n------ report loaded configuration files ------\n', config)

assert.equal(config._rcfiles.length, 1)
assert.equal(config._rcfiles[0], jsonrc)

// should not be enumerable
assert.equal(Object.keys(config).indexOf('_rcfiles'), -1)
