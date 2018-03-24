import { Config, Override, OverrideFn } from '../src';

export interface ExampleConfigShape {
	hostname: string;
	port: number;
}

export default (override: OverrideFn): Config<ExampleConfigShape> => {
	return new Config<ExampleConfigShape>({
		hostname: override({
			value: 'localhost',
			env: 'HOSTNAME_VAR'
		}).string(),
		port: 8080
	});
};