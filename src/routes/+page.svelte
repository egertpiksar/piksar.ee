<svelte:head>
	<title>PIKSAR.EE</title>
	<meta name="description" content="PIKSAR.EE" />
</svelte:head>

<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { useProgress } from '@threlte/extras'
	import { tweened } from 'svelte/motion'
	import { fade, fly } from 'svelte/transition'
	import { Theatre } from '@threlte/theatre'
	import { NoToneMapping } from 'three';

	let isWrapperVisible = true;
	let isLoaded = false;

	const { progress } = useProgress()

    const tweenedProgress = tweened($progress, {
        duration: 800
    })	

	$: if($progress){
		$tweenedProgress = parseFloat($progress.toFixed(2))
	
		if($progress === 1){
			isLoaded = true;
			setTimeout(() => {
				isWrapperVisible = false;
			}, 2000)
		}
	}

	function toFixedFloat(int: any){		
		int = Math.round(int * 100)
		return int;
	}

</script>

<div id="main">
	{#if isWrapperVisible}
		<div class="wrapper" out:fade={{duration: 1000}}>	
			<div style="font-size: 3rem; margin: 40px;" transition:fade="{{ duration: 2000 }}">
				<div>EGERT PIKSAR</div>
				<div>PORTFOOLIO © 2023</div>
			</div>				

			<div class="loadingWrapper">
				{#if isLoaded}
					<p class="loading">Let´s go!</p>
				{:else}
					<p class="loading">Loading ...</p>
				{/if}
				<div class="loadingBar" style="transform: scaleX({$tweenedProgress})"></div>
			</div>		
			
			<p style="position: absolute; bottom: 40px; right: 40px; font-size: 20rem" 
				transition:fade={{duration: 200}}>
					{toFixedFloat($tweenedProgress)}%
			</p>
		</div>
	{/if}	
	
	<!-- flat = THREE.NoToneMapping-->
	<Canvas flat>
		<Theatre>
			<Scene isPageLoaded={isLoaded}/>
		</Theatre>	
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
		background-color: black;
	}

	.loadingBar {
		width: 100%;
		height: 2px;
		background: #ffffff;
		transform: scaleX(0.0);
		transform-origin: top left;
		transition: transform 0.25s;
	}

	.loadingWrapper {
		position: absolute;
		top: 50%;
		width: 100%;
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
		font-size: 2rem;
		margin-top: -10px;
		padding-bottom: 10px;
	}

</style>