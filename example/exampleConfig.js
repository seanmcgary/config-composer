
module.exports = function(Config, Override){

	return new Config({
		hostname: ''
	}, {
		development: {
			hostname: Override({
				value: 'localhost',
				env: 'HOSTNAME_VAR'
			}),
			port: 8080
		}
	});
};