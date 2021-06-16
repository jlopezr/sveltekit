import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		files: {
			//serviceWorker: 'src/service-worker.js',
		},	

	}
};

export default config;
