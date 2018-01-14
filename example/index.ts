import Composer from '../src';
import example from './exampleConfig';


const C = new Composer({
	envPrefix: 'TEST_'
});

process.env['TEST_HOSTNAME_VAR'] = 'test';

C.setConfig(example, 'example');


console.log(C.getConfig());
console.log(C.getRequiredEnvs());
