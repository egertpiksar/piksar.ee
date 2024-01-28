<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { useProgress } from '@threlte/extras';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { ACESFilmicToneMapping } from 'three';

	let isWrapperVisible = true;
	let isLoaded = false;
	let isReady = false;
	let halloAudio: any;
	let fireplaceAudio: any;
	let musicInterval: any;
	let isMusicPlaying = false;
	let isHalloPlaying = false;
	let date = new Date();

	$: outerWidth = 0;

	const { progress } = useProgress();

	const tweenedProgress = tweened($progress, {
		duration: 800
	});

	$: if ($progress) {
		$tweenedProgress = parseFloat($progress.toFixed(2));
		if ($progress === 1) {
			isReady = true;
		}
	}

	function closeWrapper() {
		isLoaded = true;
		isWrapperVisible = false;
	}

	function toFixedFloat(int: any) {
		int = Math.round(int * 100);
		return int;
	}

	function toggleHalloo(e: any) {
		isHalloPlaying = !isHalloPlaying;
		halloAudio.play();
	}

	function startMusic(e: any) {
		isMusicPlaying = true;
		fireplaceAudio.play();
		const bars = document.querySelectorAll('.bar');
		musicInterval = setInterval(() => {
			bars.forEach((bar) => {
				let val = Math.floor(Math.random() * 90);
				bar.style.height = `${val}%`;
			});
		}, 500);
	}

	function stopMusic(e: any) {
		if (isMusicPlaying || isHalloPlaying) {
			fireplaceAudio.stop();
			halloAudio.stop();
			clearInterval(musicInterval);
			const bars = document.querySelectorAll('.bar');
			bars.forEach((bar) => {
				let val = 15;
				bar.style.height = `${val}%`;
			});
			isMusicPlaying = false;
		}
	}

	function toggleMusic(e: any) {
		if (isMusicPlaying) {
			stopMusic(e);
		} else {
			startMusic(e);
		}
	}
</script>

<svelte:window bind:outerWidth />

<div id="main">
	{#if isWrapperVisible}
		<div class="wrapper" out:fade={{ duration: 1000 }}>
			<div class="wrapperName" transition:fade={{ duration: 2000 }}>
				<div>EGERT PIKSAR</div>
				<div>PLAYGROUND © {date.getFullYear()}</div>
			</div>

			<div class="loadingWrapper">
				{#if isReady}
					<p class="loading">Let´s go!</p>
				{:else}
					<p class="loading">Loading ...</p>
				{/if}

				<div class="loadingBar" style="transform: scaleX({$tweenedProgress})" />

				{#if isReady}
					<button class="button" on:click={() => closeWrapper()}>
						<div class="button__filler" />
						<span class="button__text">
							<span class="button__text-inner">Click to continue</span>
						</span>
					</button>
				{/if}
			</div>

			<p class="loadingPrecent" transition:fade={{ duration: 200 }}>
				{toFixedFloat($tweenedProgress)}%
			</p>
		</div>
	{:else}
		<div class="layout">
			<div class="name" in:fade={{ delay: 1500, duration: 1000 }}>
				<div>
					<div>EGERT PIKSAR</div>
					<div>PLAYGROUND © {date.getFullYear()}</div>
				</div>
			</div>

			<div class="description" in:fade={{ delay: 2000, duration: 1000 }}>
				<div>creative developer</div>
			</div>

			<!-- autoplay chromes disabled -->
			<div
				class="icon"
				in:fade={{ delay: 2000, duration: 1000 }}
				use:toggleMusic
				on:click={(e) => toggleMusic(e)}
			>
				<div id="bars">
					<div class="bar" />
					<div class="bar" />
					<div class="bar" />
					<div class="bar" />
					<div class="bar" />
				</div>
			</div>

			<div class="contact" in:fade={{ delay: 2000, duration: 1000 }}>
				<div on:pointerenter={toggleHalloo}>info@piksar.ee</div>
			</div>
		</div>
	{/if}

	<Canvas toneMapping={ACESFilmicToneMapping}>
		<!-- <Theatre> -->
		<Scene isPageLoaded={isLoaded} bind:halloAudio bind:fireplaceAudio bind:outerWidth />
		<!-- </Theatre> -->
	</Canvas>
</div>

<style>
	.button {
		cursor: pointer;
		border-width: 2px;
		border-color: #fff;
		border-style: solid;
		color: #fff;
		background: transparent;
		border-radius: 40px;
		min-width: 19rem;
		height: 6rem;
		padding: 0;
		margin: 1rem;
		font-family: inherit;
		font-size: 1.5rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button:hover {
		background: #fff;
		color: #000;
	}

	.button__text,
	.button__text-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

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
		transform: scaleX(0);
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

	.loadingPrecent {
		position: absolute;
		bottom: 40px;
		right: 40px;
		font-size: 20rem;
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

	.wrapperName {
		font-size: 3rem;
		margin: 40px;
	}

	.name {
		grid-area: name;
		font-size: 2.25rem;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 40px 40px 0 40px;
		pointer-events: all;
	}

	.contact {
		grid-area: contact;
		font-size: 1.5rem;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		margin: 0 0 40px 40px;
		pointer-events: all;
	}

	.description {
		grid-area: desc;
		font-size: 1.5rem;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		margin: 0 0 10px 40px;
		pointer-events: all;
	}

	.icon {
		grid-area: icon;
		font-size: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		margin: 0 0 40px 40px;
		pointer-events: all;
		cursor: pointer;
	}

	.loading {
		font-size: 2.25rem;
		margin-top: -10px;
		padding-bottom: 10px;
	}

	#bars {
		height: 50%;
		width: fit-content;
		flex-shrink: 0;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: repeat(5, 4px);
		gap: 2px;
		place-items: end center;
	}

	.bar {
		height: 10%;
		width: 4px;
		background-color: white;
		transition: 500ms ease-in-out;
	}

	.layout {
		position: absolute;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 100px 1fr 30px 60px;
		grid-template-areas:
			'name name name name .'
			'. . . . .'
			'desc desc . icon .'
			'contact contact . icon .';
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		color: white;
		pointer-events: none;
	}

	/* 'sm': '640px' */
	@media (max-width: 640px) {
		.wrapperName {
			font-size: 1.5rem;
		}

		.loadingPrecent {
			font-size: 5rem;
		}

		.loading {
			font-size: 1.5rem;
		}

		.button {
			font-size: 1rem;
			min-width: 16rem;
		}

		.layout {
			grid-template-rows: 100px 1fr 30px 60px;
			grid-template-areas:
				'name name name name .'
				'. . . . .'
				'desc desc . icon .'
				'contact contact . icon .';
		}

		.name {
			font-size: 1.5rem;
		}

		.contact {
			font-size: 1.25rem;
			margin: 0 0 40px 40px;
			justify-content: flex-start;
		}

		.description {
			font-size: 1.25rem;
			margin-bottom: 0;
		}

		.icon {
			font-size: 1.25rem;
			margin: 0 40px 40px 0;
		}
	}

	/* 'md': '768px' */
	@media (min-width: 768px) {
		.contact {
			margin: 0 0 40px 40px;
			justify-content: flex-start;
		}

		.description {
			margin-bottom: 0.5rem;
		}
	}

	/*  'lg': '1024px' */
	@media (min-width: 1024px) {
	}

	/*  'xl': '1280px' */
	@media (min-width: 1280px) {
		.layout {
			position: absolute;
			display: grid;
			grid-template-columns: auto;
			grid-template-rows: 100px 1fr 100px;
			grid-template-areas:
				'name . . . .'
				'. . . . .'
				'desc desc icon contact contact';
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			color: white;
			pointer-events: none;
		}

		.contact {
			margin: 0 40px 40px;
			justify-content: flex-end;
		}

		.description {
			margin-bottom: 0.5rem;
			margin: 0 0 40px 40px;
		}
	}

	/*  '2xl': '1536px' */
	@media (min-width: 1536px) {
	}
</style>
