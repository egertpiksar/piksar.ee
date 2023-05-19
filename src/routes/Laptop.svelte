<script>
	import { GLTF } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
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
