<script lang="ts">
	import trophy from '$lib/models/Trophy/trophy.glb';
	import { useGltf, Text, GLTF } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	// import { Editable } from '@threlte/theatre';

	const gltf = useGltf(trophy, {
		useDraco: true
	});

	$: console.log('trohpy', $gltf);
</script>

{#if $gltf}
	<T.Group position={[-0.4, 0.68, -4.45]} rotation.y={degToRad(50)} scale={0.4}>
		<!-- <Object3DInstance object={$gltf.scene} castShadow receiveShadow scale={0.2} /> -->
		<GLTF url={trophy} useDraco scale={0.2} />

		<Text
			text="EGERT P"
			color={'#fff'}
			font={'https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3'}
			fontSize={0.05}
			textAlign="center"
			position={[-0.1, 0.13, 0.155]}
		/>
		<!-- <Editable name="Trophy" transform /> -->
	</T.Group>
{/if}
