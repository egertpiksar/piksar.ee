<script>
	import { useGltf, GLTF, Text, useTexture, useGltfAnimations } from '@threlte/extras';
	import { T, Object3DInstance } from '@threlte/core';
	import { DEG2RAD, degToRad } from 'three/src/math/MathUtils';
	import warehousejpg from '$lib/models/warehouse/textures/lambert4_diffuse.jpeg';
	import laptop from '$lib/models/Laptop/low_poly_laptop.glb';
	import { Editable } from '@threlte/theatre';
</script>

<GLTF
	receiveShadow
	castShadow
	useDraco
	url={laptop}
	rotation.y={degToRad(325)}
	position={[0, 0, -8]}
	scale={0.03}
>
	<Editable name="laptop" transform />
</GLTF>
