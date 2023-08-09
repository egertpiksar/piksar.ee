<script>
	import { GLTF, useGltf } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import laptop from '$lib/models/Laptop/low_poly_laptop.glb';
	import mouse from '$lib/models/Laptop/low_poly_computer_mouse_free.glb';
	// import { Editable } from '@threlte/theatre';

	export let cameraOffset;
	export let isHoveredLaptop = false;

	const gltf = useGltf(laptop, {
		useDraco: true
	});

	// TODO disableme zoomOuti nii kauaks kuni kohale sõidab
	function zoomInLaptop() {
		console.log('zoooom IN');
		isHoveredLaptop = true;
		cameraOffset = { x: 0, y: 0.8, z: -3.5 };
		console.log('cameraOffset1', cameraOffset);
	}

	function zoomOutLaptop() {
		if (!isHoveredLaptop) {
			cameraOffset = { x: 3.7, y: 1, z: 0 };
		}
	}

	$: console.log('laptop', $gltf);
</script>

{#if $gltf}
	<T.Group
		rotation.y={degToRad(270)}
		position={[-0.04, 0.7, -4.05]}
		scale={0.02}
		interactive
		on:pointerenter={() => zoomInLaptop()}
		on:pointerleave={() => zoomOutLaptop()}
	>
		<T.Group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
			<T.Group
				name="da67fe2fab1e411099a40fbaf80cab7afbx"
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.01}
			>
				<T.Group
					name="Light"
					position={[1730.1, 2055.05, 953.07]}
					rotation={[1.07, 0.55, -1.01]}
					scale={100}
				>
					<T.Group name="Object_4" rotation={[Math.PI / 2, 0, 0]} />
				</T.Group>
				<T.Group
					name="Camera"
					position={[4112.58, 2583.31, 4427.85]}
					rotation={[-Math.PI, 0.81, 2.81]}
					scale={100}
				/>
				<T.Group
					name="Cube001"
					position={[-640.76, 638.49, 0]}
					rotation={[-Math.PI / 2, Math.PI / 2, 0]}
					scale={[591.71, 951.18, 49.91]}
				>
					<T.Mesh
						name="Cube001_Material001_0"
						castShadow
						receiveShadow
						geometry={$gltf.nodes.Cube001_Material001_0.geometry}
						material={$gltf.materials['Material.001']}
					/>
					<T.Mesh
						name="Cube001_Material_0"
						castShadow
						receiveShadow
						geometry={$gltf.nodes.Cube001_Material_0.geometry}
						material={$gltf.materials.Material}
					/>
				</T.Group>
				<T.Group
					name="Cube002"
					position={[-589.01, 47.15, 959]}
					rotation={[-Math.PI / 2, Math.PI / 2, 0]}
					scale={[705.17, 951.18, 49.91]}
				>
					<T.Mesh
						name="Cube002_Material001_0"
						castShadow
						receiveShadow
						geometry={$gltf.nodes.Cube002_Material001_0.geometry}
						material={$gltf.materials['Material.001']}
					/>
					<T.Mesh
						name="Cube002_Material_0"
						castShadow
						receiveShadow
						geometry={$gltf.nodes.Cube002_Material_0.geometry}
						material={$gltf.materials.Material}
					/>
				</T.Group>
			</T.Group>
		</T.Group>
	</T.Group>
{/if}

<!-- <GLTF
	receiveShadow
	castShadow
	useDraco
	url={laptop}
	rotation.y={degToRad(270)}
	position={[-0.04, 0.7, -4.05]}
	scale={0.02}
>
	<Editable name="laptop" transform />
</GLTF> -->

<GLTF receiveShadow useDraco url={mouse} position={[0.25, 0.7, -4.05]} scale={0.05}>
	<!-- <Editable name="mouse" transform /> -->
</GLTF>
