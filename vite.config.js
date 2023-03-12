import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.ogv', '**/*.cube', "**/*.tsx"],
};

export default config;