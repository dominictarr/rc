
var n = 'rc'+Math.random()
var assert = require('assert')
var yaml = require('yaml')
var fs = require('fs')
var path = require('path')
var jsonrc = path.resolve('.' + n + 'rc.json');

console.log('---extensions---\n\n')

process.env[n + '_envOption'] = 42

fs.writeFileSync(jsonrc, [
  '{',
    '// json overrides default',
    '"option": false,',
    '/* env overrides json */',
    '"envOption": 24',
  '}'
].join('\n'));

var commentedJSON = require('../')(n, {
  option: true
})

fs.unlinkSync(jsonrc);

console.log('Commented:', commentedJSON, commentedJSON.configs)

assert.equal(commentedJSON.option, false)
assert.equal(commentedJSON.envOption, 42)

assert.equal(commentedJSON.config, jsonrc)
assert.equal(commentedJSON.configs.length, 1)
assert.equal(commentedJSON.configs[0], jsonrc)

var inirc = path.resolve('.' + n + 'rc.ini');

fs.writeFileSync(inirc, [
    ';  ini overrides default',
    'option=false',
    ';  env overrides ini',
    'envOption=24'
].join('\n'));

var ini = require('../')(n, {
  option: true
})

fs.unlinkSync(inirc);

console.log(ini)

assert.equal(ini.option, false)
assert.equal(ini.envOption, 42)

assert.equal(ini.config, inirc)
assert.equal(ini.configs.length, 1)
assert.equal(ini.configs[0], inirc)

var yamlrc = path.resolve('.' + n + 'rc.yaml');

fs.writeFileSync(yamlrc, [
    '---',
    '  envOption: 24',
    '  option: false',
    ''
].join('\n'));

var yamlconfig = require('../')(n, {
  option: true
}, false, {
  'yaml': function (contents) {
    return yaml.eval(contents)
  }
})

fs.unlinkSync(yamlrc);

console.log(yamlconfig)

assert.equal(yamlconfig.option, false)
assert.equal(yamlconfig.envOption, 42)

assert.equal(yamlconfig.config, yamlrc)
assert.equal(yamlconfig.configs.length, 1)
assert.equal(yamlconfig.configs[0], yamlrc)
