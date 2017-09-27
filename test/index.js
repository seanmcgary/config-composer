var _ = require('lodash');
var assert = require('assert');
var path = require('path');
var CC = require('../');


describe('ConfigComposer', function(){

	it('should build and empty config with only the env', function(done){
		var Composer = new CC.Composer({
			configPath: __dirname
		});

		var config = Composer.getConfig();
		assert.ok(config.env);
		assert.equal(config.env, 'test');
		done();
	});

	it('should load a simple config', function(done){
		var Composer = new CC.Composer({
			configPath: path.resolve(__dirname + '/config')
		});

		Composer.loadConfig('simple');

		var config = Composer.getConfig();
		assert.ok(config.simple);
		assert.equal(config.simple.test, 'foobar');
		done();
	});

	it('should load a simple config with an aliased name', function(done){
		var Composer = new CC.Composer({
			configPath: path.resolve(__dirname + '/config')
		});

		Composer.loadConfig('simple', 'supaSimple');

		var config = Composer.getConfig();
		assert.ok(config.supaSimple);
		assert.equal(config.supaSimple.test, 'foobar');
		done();
	});

	it('should load a nested config and camelCase the name', function(done){
		var Composer = new CC.Composer({
			configPath: path.resolve(__dirname + '/config')
		});

		Composer.loadConfig('nested/config');

		var config = Composer.getConfig();
		assert.ok(config.nestedConfig);
		assert.equal(config.nestedConfig.test, 'foobar');
		done();
	});

	it('should load the value from an environment variable', function(done){
		process.env.TEST_ENV = 'test';

		var Composer = new CC.Composer({
			configPath: path.resolve(__dirname + '/config')
		});

		Composer.loadConfig('env', 'testEnv');

		var config = Composer.getConfig();
		assert.ok(config.testEnv);
		assert.equal(config.testEnv.test, 'test');
		done();
	});

	it('should load the value from an environment variable with an env prefix', function(done){
		process.env.PREFIX_TEST_ENV = 'env prefix';

		var Composer = new CC.Composer({
			configPath: path.resolve(__dirname + '/config'),
			envPrefix: 'PREFIX_'
		});

		Composer.loadConfig('env', 'testEnv');

		var config = Composer.getConfig();
		assert.ok(config.testEnv);
		assert.equal(config.testEnv.test, 'env prefix');
		done();
	});

	it('should load a config as a function', function(done) {
		const c = function(Config, Override) {
			return new Config({
				test: 'foo'
			});
		};

		var Composer = new CC.Composer({
			configPath: path.resolve(__dirname + '/config'),
			envPrefix: 'PREFIX_'
		});

		Composer.setConfig(c, 'functionEnv');

		var config = Composer.getConfig();
		assert.ok(config.functionEnv);
		assert.equal(config.functionEnv.test, 'foo');
		done();
	});

});