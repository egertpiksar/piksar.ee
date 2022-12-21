import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
//import { CustomGrid } from '$lib/CustomGrid'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	//preprocess: vitePreprocess(),
	preprocess: seqPreprocessor([preprocess(), preprocessThrelte({
		extensions: {
			// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
			'three/examples/jsm/controls/OrbitControls': [OrbitControls],

			// import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
			'three/examples/jsm/controls/TransformControls': [TransformControls],

			// import { CustomGrid } from '$lib/CustomGrid'
			//'$lib/CustomGrid': [CustomGrid]
		}
	})]),

	kit: {
		adapter: adapter()
	}
};

export default config;
