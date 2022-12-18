<svelte:head>
	<title>PIKSAR.EE</title>
	<meta name="description" content="PIKSAR.EE" />
</svelte:head>

<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { useProgress } from '@threlte/extras'
	import { tweened } from 'svelte/motion'
	import { fade } from 'svelte/transition'

	let isLoaded = false;

	const { progress } = useProgress()

    const tweenedProgress = tweened($progress, {
        duration: 800
    })	

	$: if($progress){
		console.log($progress, $tweenedProgress);

		if($progress === 1){
			setTimeout(() => {
				//isLoaded = true;
			}, 1500)
		}
	}

    $: tweenedProgress.set($progress)

</script>

<div id="main">
	{#if !isLoaded}
		<div class="wrapper" transition:fade|local={{duration: 200}}>	
			<div style="font-size: 30px; margin: 40px;">
				<div>EGERT PIKSAR</div>
				<div>PORTFOOLIO © 2023</div>
			</div>				

			<div class="asd">
				<p class="loading">Loading {$tweenedProgress * 100}%</p>
			</div>
			

			<!-- <div class="bar-wrapper">
				<div class="bar" style="width: {$tweenedProgress * 100}%" />
			</div> -->

			<div class="loading-bar" style="transform: scaleX({$tweenedProgress})"></div>
		</div>
	{/if}

	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	#main {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
		height: 100%;
    	width: 100%;
	}

	.loading-bar
	{
		position: absolute;
		top: 50%;
		width: 100%;
		height: 2px;
		background: #ffffff;
		transform: scaleX(0.0);
		transform-origin: top left;
		transition: transform 0.25s;
	}

	.asd{
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: center;
		justify-content: center;
	}

	.wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: black;
		
		color: white;
	}

	.loading {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.bar-wrapper {
		width: 33.333333%;
		height: 10px;
		border: 1px solid white;
		position: relative;
	}

	.bar {
		height: 100%;
		background-color: white;
	}
</style>