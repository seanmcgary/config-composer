import * as _ from 'lodash';

export interface OverrideInterface {
	env?: string;
	value?: string | object | boolean | number,
	forceEnv?: boolean;
}

export type OverrideFn = (data: OverrideInterface) => OverrideValue;

export class OverrideValue {
	public value: any;
	constructor(value: any) {
		this.value = value;
	}

	string(): string {
		if (typeof this.value.toString === 'function') {
			return this.value.toString();
		}

		return `${this.value}`;
	}

	boolean(): boolean {
		if (_.isString(this.value) && ['true', 'false'].includes(this.value.toLowerCase())) {
			return this.value.toLowerCase() === 'true';
		}

		return this.value === true;
	}

	int(): number {
		return parseInt(this.value);
	}

	float(): number {
		return parseFloat(this.value);
	}

	null(): null {
		if (this.value === null || this.value === 'null') {
			return null;
		}
		return undefined;
	}
}

export function Override(data: OverrideInterface): OverrideValue {
	if(!data.env && !data.value){
		throw new Error('Override expects a value and environment variable name')
	}

	const envName = [this.options.envPrefix, data.env].join('');

	const env = process.env[envName];

	return new OverrideValue(data.forceEnv ? env : (env || data.value));
}


export interface ConfigInterface {
	[key: string]: OverrideInterface | object | string | boolean | number;
}

export class Config<C> {
	public config: C;

	constructor(config: C) {
		this.config = config;
	}

	parse(): C {
		return this.config;
	}
}

export type ConfigFn<C> = (o: OverrideFn) => Config<C>;

export interface ComposerOptions {
	envPrefix: string;
}

export default class Composer<ConfigShape> {
	public config: ConfigInterface = {};
	public envs: string[] = [];
	public options: ComposerOptions;
	public env: string;

	constructor(options: ComposerOptions) {
		this.config = {};
		this.env = (process.env.NODE_ENV || 'development');
		this.config.env = this.env;

		this.options = _.defaults(options || {}, {
			envPrefix: ''
		});
	}

	setConfig<C>(fn: ConfigFn<C>, name: string) {
		const config = fn(Override.bind(this));
		this.config[_.camelCase(name)] = config.parse();
	}

	getConfig(): ConfigShape & ConfigInterface {
		return <ConfigShape & ConfigInterface>this.config;
	}

	getRequiredEnvs(){
		return this.envs;
	}
}

