import * as _ from 'lodash';

export interface OverrideInterface {
	env: string;
	value: string | object | boolean | number,
	forceEnv?: boolean;
}

export type OverrideFn = (data: OverrideInterface) => OverrideInterface;

export function Override(data: OverrideInterface){
	if(!data.env && !data.value){
		throw new Error('Override expects a value and environment variable name')
	}

	const envName = [this.options.envPrefix, data.env].join('');

	const env = process.env[envName];

	return data.forceEnv ? env : (env || data.value);
}


export interface ConfigInterface {
	[key: string]: OverrideInterface | object | string | boolean | number;
}

export class Config {
	public config: ConfigInterface = {};

	constructor(config: ConfigInterface) {
		this.config = config;
	}

	parseForEnv(environment: string){
		return _.merge({}, this.config);
	}
}

export type ConfigFn = (o: OverrideFn) => Config;

export interface ComposerOptions {
	envPrefix: string;
}

export default class Composer {
	public config: ConfigInterface = {};
	public envs: string[] = [];
	public options: ComposerOptions;
	public env: string;

	constructor(options: ComposerOptions) {
		this.env = (process.env.NODE_ENV || 'development');
		this.config.env = this.env;

		this.options = _.defaults(options || {}, {
			envPrefix: ''
		});
	}

	setConfig(fn: ConfigFn, name: string) {
		const config = fn(Override.bind(this));
		this.config[_.camelCase(name)] = config.parseForEnv(this.env);
	}

	getConfig(){
		return this.config;
	}

	getRequiredEnvs(){
		return this.envs;
	}
}

