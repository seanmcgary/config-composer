module.exports = function(Config, Override){

	return new Config({
		test: Override({
			env: 'TEST_ENV'
		})
	});
};