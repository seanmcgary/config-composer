var _ = require('lodash');
var path = require('path');

function Override(data){
	var self = this;

	if(!data.env && !data.value){
		throw new Error('Override expects a value and environment variable name')
	}

	var env = process.env[data.env];

	return data.forceEnv ? env : (env || data.value);
};

function Config(base, environments){
	var self = this;
	self.base = base || {};
	self.environments = environments || {};
};

Config.prototype.parseForEnv = function(environment){
	var self = this;
	
	return _.merge(self.base, self.environments[environment] || {});
};

/*
	options = {
		configPath: '/../some/path'
	}
*/
function Composer(options){
	var self = this;
	self.config = {};
	self.config.env = self.env = (process.env.NODE_ENV || 'development');


	if(!options.configPath){
		throw new Error('options.configPath is required');
	}

	self.configPath = path.resolve(options.configPath);
};

Composer.prototype.loadConfig = function(name, path){
	var self = this;

	var config;
	try {
		config = require([self.configPath, path].join('/'))(Config, Override);
	} catch(e){
		console.log(e);
		console.log(e.stack);
	}

	if(config){
		self.config[name] = config.parseForEnv(self.env);
	}
};

Composer.prototype.getConfig = function(){
	return this.config;
};

exports.Composer = Composer;
exports.Config = Config;

