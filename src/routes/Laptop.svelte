<script>
	import { GLTF } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import laptop from '$lib/models/Laptop/low_poly_laptop.glb';
	import mouse from '$lib/models/Laptop/low_poly_computer_mouse_free.glb';
	import { Editable } from '@threlte/theatre';
</script>

<GLTF
	receiveShadow
	castShadow
	useDraco
	url={laptop}
	rotation.y={degToRad(270)}
	position={[-0.04, 0.7, -4.05]}
	scale={0.02}
>
	<Editable name="laptop" transform />
</GLTF>

<GLTF receiveShadow useDraco url={mouse} position={[0.25, 0.7, -4.05]} scale={0.05}>
	<Editable name="mouse" transform />
</GLTF>
