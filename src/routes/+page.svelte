<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
</script>

<svelte:head>
	<title>PIKSAR.EE</title>
	<meta name="description" content="PIKSAR.EE" />
</svelte:head>

<div>
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
		height: 100%;
    	width: 100%;
	}
</style>