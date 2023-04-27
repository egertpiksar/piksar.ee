<script lang="ts">
	import { onMount } from 'svelte';
	import drone from '$lib/models/Drone/drone.glb';
	import drone_m from '$lib/models/Drone/drone_m.png';
	import drone_n from '$lib/models/Drone/drone_n.png';
	import drone_ao from '$lib/models/Drone/drone_ao.png';
	import drone_d from '$lib/models/Drone/drone_d.png';
	import drone_e from '$lib/models/Drone/drone_e.png';
	import drone_r from '$lib/models/Drone/drone_r.png';
	import { useThrelte, T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { Vector3, Plane } from 'three';
	import { useGltf, useTexture, GLTF, interactivity, useInteractivity } from '@threlte/extras';
	import { injectLookAtPlugin } from './plugins/lookAtPlugin';

	interactivity();
	injectLookAtPlugin();

	const { pointer, raycaster, pointerOverTarget } = useInteractivity();
	const { camera } = useThrelte();

	const gltf = useGltf(drone, {
		useDraco: true
	});

	const textures = useTexture(drone_d);

	$: if ($textures) {
		$textures.flipY = false;
	}

	let pointOfIntersection = new Vector3();

	const offsetX = spring(0, {
		stiffness: 0.005,
		damping: 0.5
	});

	$: if ($pointer && $pointer.x) {
		offsetX.set($pointer.x * 6);
	}

	const offsetY = spring(2, {
		stiffness: 0.003,
		damping: 0.5
	});

	// kui liigutada drooni Z, siis seda ka timmida
	let cubePosition = new Vector3(0, 0, -7);

	$: if ($pointer && raycaster && $pointerOverTarget) {
		console.log($pointer.y);
		if ($pointer.y > 0 && $pointer.y < 0.4) {
			//console.log('TULI');
			offsetY.set($pointer.y * 10);
			//console.log('offsetY', $offsetY);
			//$droneOffset.y = $pointer.y * 10;
		}

		raycaster.setFromCamera($pointer, $camera);

		const direction = new Vector3().subVectors($camera.position, cubePosition).normalize();
		const point = cubePosition.clone().add(direction.clone().multiplyScalar(3));

		const plane = new Plane().setFromNormalAndCoplanarPoint(direction, point);

		raycaster.ray.intersectPlane(plane, pointOfIntersection);
		pointOfIntersection = pointOfIntersection;
	}
</script>

{#if $gltf && $textures}
	<T.Group lookAt={pointOfIntersection} position={[$offsetX, $offsetY, -7.5]}>
		<T.Mesh
			receiveShadow
			castShadow
			scale={0.002}
			geometry={$gltf.nodes.Box001.geometry}
			rotation.x={Math.PI / 2}
			rotation.z={-Math.PI / 2}
		>
			<T.MeshBasicMaterial map={$textures} />
		</T.Mesh>

		<T.Mesh
			receiveShadow
			scale={0.002}
			geometry={$gltf.nodes.Object002.geometry}
			rotation.x={Math.PI / 2}
			rotation.z={-Math.PI / 2}
		>
			<T.MeshBasicMaterial map={$textures} />
		</T.Mesh>
	</T.Group>
{/if}
