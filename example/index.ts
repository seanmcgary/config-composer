import Composer from '../src';
import example, { ExampleConfigShape } from './exampleConfig';

interface ConfigShape {
	example: ExampleConfigShape;
}

const C = new Composer<ConfigShape>({
	envPrefix: 'TEST_'
});

process.env['TEST_HOSTNAME_VAR'] = 'test';
process.env['TEST_PORT_VAR'] = '8000';

C.setConfig<ExampleConfigShape>(example, 'example');


console.log(C.getConfig());

