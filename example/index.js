var CC = require('../');

var Composer = new CC.Composer({
	configPath: __dirname
});

Composer.loadConfig('stuff', 'exampleConfig');

console.log(Composer.getConfig());