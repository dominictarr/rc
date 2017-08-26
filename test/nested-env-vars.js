
var seed = Math.random();
var n = 'rc'+ seed;
var N = 'RC'+ seed;
var assert = require('assert')


// Basic usage
process.env[n+'_someOpt__a'] = 42
process.env[n+'_someOpt__x__'] = 99
process.env[n+'_someOpt__a__b'] = 186
process.env[n+'_someOpt__a__b__c'] = 243
process.env[n+'_someOpt__x__y'] = 1862
process.env[n+'_someOpt__z'] = 186577

// Should ignore empty strings from orphaned '__'
process.env[n+'_someOpt__z__x__'] = 18629
process.env[n+'_someOpt__w__w__'] = 18629

// Leading '__' should ignore everything up to 'z'
process.env[n+'___z__i__'] = 9999

// should ignore case for config name section.
process.env[N+'_test_upperCase'] = 187

// Should parse strings
process.env[n+'_string__number'] = '-0.2432423'
process.env[n+'_string__boolean'] = 'false'
process.env[n+'_string__string'] = '_test'
process.env[n+'_string__empty'] = ''
process.env[n+'_string__undefined'] = 'undefined'
process.env[n+'_string__null'] = 'null'
process.env[n+'_string__object'] = '{ test: "true" }'

function testPrefix(prefix) {
	var config = require('../')(prefix, {
	  option: true
	})

	console.log('\n\n------ nested-env-vars ------\n',{prefix: prefix}, '\n', config);

	assert.equal(config.option, true)
	assert.equal(config.someOpt.a, 42)
	assert.equal(config.someOpt.x, 99)
	// Should not override `a` once it's been set
	assert.equal(config.someOpt.a/*.b*/, 42)
	// Should not override `x` once it's been set
	assert.equal(config.someOpt.x/*.y*/, 99)
	assert.equal(config.someOpt.z, 186577)
	// Should not override `z` once it's been set
	assert.equal(config.someOpt.z/*.x*/, 186577)
	assert.equal(config.someOpt.w.w, 18629)
	assert.equal(config.z.i, 9999)

	assert.equal(config.test_upperCase, 187)

	assert.equal(config.string.number, -0.2432423)
	assert.equal(typeof config.string.number, 'number')
	assert.equal(config.string.boolean, false)
	assert.equal(typeof config.string.boolean, 'boolean')
	assert.equal(config.string.string, '_test')
	assert.equal(typeof config.string.string, 'string')
	assert.equal(config.string.empty, '')
	assert.equal(typeof config.string.empty, 'string')
	assert.equal(config.string.undefined, 'undefined')
	assert.equal(typeof config.string.undefined, 'string')
	assert.equal(config.string.null, null)
	assert.equal(typeof config.string.null, 'object')
	assert.equal(config.string.object, '{ test: "true" }')
	assert.equal(typeof config.string.object, 'string')
}

testPrefix(n);
testPrefix(N);
