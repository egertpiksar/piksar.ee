<script lang="ts">
    import { Editable } from '@threlte/theatre'
    import { Pass, T } from '@threlte/core'
    import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
    import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
    import { Vector2, 
    } from 'three';
	import { radToDeg } from 'three/src/math/MathUtils';

    const newPass = new UnrealBloomPass(
        new Vector2(window.innerWidth, window.innerHeight),
        //strenght
        1,
        // radius
        1,
        // thresh
        0
    )

</script>

<!-- <Pass pass={newPass} /> -->

