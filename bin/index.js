#!/usr/bin/env node


require('ts-node').register({
	projectSearchDir: __dirname, // tell ts-node where to find our local tsconfig.json and local typescript version
});
require('../index.ts'); // now that ts-node has been installed, our code will compile


/* RUBBISH

#!/usr/bin/env ts-node(-script)

// require('../dist/index');

// require('ts-node').register();
// require('../index.ts');
// import * as TSNode from 'ts-node';
// TSNode.register();
import '../index.ts';
// require('../index.ts');

*/