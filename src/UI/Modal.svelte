<script lang="ts">
	import Button from './Button.svelte';
	import { fly, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let title: string = '';
</script>

<div
	transition:fade
	class="modal-backdrop"
	on:click={() => {
		dispatch('cancel');
	}}
	on:keydown={() => {
		dispatch('cancel');
	}}
/>
<div transition:fly={{ y: 300 }} class="modal text-white">
	<h1>{title}</h1>
	<div class="content">
		<slot name="modal-content" />
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}

	.modal {
		position: fixed;
		background-image: url('/new-post.svg');
		background-repeat: no-repeat;
		background-size: cover;

		top: 10vh;
		left: 10%;
		width: 80%;
		max-height: 80vh;
		border-radius: 5px;
		z-index: 100;
		box-shadow: 0 0px 50px rgba(255, 255, 255, 0.2);
		overflow: auto;
	}

	h1 {
		padding: 1rem;
		margin: 0;
		border-bottom: 1px solid #ccc;
		font-family: 'Roboto Slab', sans-serif;
	}

	.content {
		padding: 1rem;
	}

	footer {
		padding: 1rem;
	}

	@media (min-width: 768px) {
		.modal {
			width: 40rem;
			left: calc(50% - 20rem);
		}
	}
</style>
