import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.ogv', '**/*.cube'],
};

export default config;