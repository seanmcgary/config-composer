import { Config, Override, OverrideFn } from '../src';

export default function(override: OverrideFn) {
	return new Config({
		hostname: override({
			value: 'localhost',
			env: 'HOSTNAME_VAR'
		}),
		port: 8080
	});
};