<script lang="ts">
	import threejsjourney from '$lib/models/Trophy/threejsjourney.glb';
	import ams20 from '$lib/models/Trophy/ams20.glb';
	import ams22 from '$lib/models/Trophy/ams22.glb';
	import tor23 from '$lib/models/Trophy/tor23.glb';
	import cph23 from '$lib/models/Trophy/cph23.glb';
	import { useGltf, Text, GLTF } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	// import { Editable } from '@threlte/theatre';

	const threejsjourneygltf = useGltf(threejsjourney, {
		useDraco: true
	});

	const ams20gltf = useGltf(ams20, {
		useDraco: true
	});

	const ams22gltf = useGltf(ams22, {
		useDraco: true
	});

	const tor23gltf = useGltf(tor23, {
		useDraco: true
	});

	const cph23gltf = useGltf(cph23, {
		useDraco: true
	});
</script>

<!-- laua peal: position={[0.2, 0.68, -4.5]} -->
{#if $threejsjourneygltf}
	<GLTF
		url={threejsjourney}
		useDraco
		scale={0.15}
		rotation.y={degToRad(50)}
		position={[0.35, 0.03, -3.7]}
	/>
{/if}

{#if $ams20gltf}
	<GLTF url={ams20} useDraco scale={0.15} rotation.y={degToRad(32)} position={[0.5, 0.03, -4.7]} />
{/if}

{#if $ams22gltf}
	<GLTF url={ams22} useDraco scale={0.15} rotation.y={degToRad(37)} position={[0.73, 0.03, -4.5]} />
{/if}

{#if $tor23gltf}
	<GLTF url={tor23} useDraco scale={0.12} rotation.y={degToRad(37)} position={[0.73, 0.75, -4.6]} />
{/if}

{#if $cph23gltf}
	<GLTF
		url={cph23}
		useDraco
		scale={0.12}
		rotation.y={degToRad(35)}
		position={[0.73, 0.75, -4.65]}
	/>
{/if}
