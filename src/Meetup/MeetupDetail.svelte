<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';
	import meetups from './meetup-store';
	import type { Meetup } from '../utils/model/Meetup.model';
	import Button from '../UI/Button.svelte';
	import Modal from '../UI/Modal.svelte';
	import Map from '../UI/Map.svelte';
	export let id: string = '';

	let selectedMeetup: Meetup | undefined;

	const unsubscribe = meetups.subscribe((items) => {
		selectedMeetup = items.find((i) => i.id === id);
	});

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if selectedMeetup}
	<Modal>
		<section slot="modal-content">
			<div class="image">
				<img src={selectedMeetup.imageUrl} alt={selectedMeetup.title} />
			</div>
			<div class="content">
				<h1>{selectedMeetup.title}</h1>
				<h2>{selectedMeetup.subtitle} - {selectedMeetup.address}</h2>
				<p>{selectedMeetup.description}</p>
			</div>

			<Map meetup={selectedMeetup} />
		</section>
		<div class="actions" slot="modal-footer">
			<Button href="mailto:{selectedMeetup.contactEmail}">Contact</Button>
			<Button type="button" mode="btn-error" on:click={() => dispatch('close')}>Close</Button>
		</div>
	</Modal>
{/if}

<style>
	.image {
		width: 100%;
		height: 25rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image {
		background: #e7e7e7;
	}

	.content {
		text-align: center;
		width: 80%;
		margin: auto;
	}
	.actions {
		display: flex;
		justify-content: center;
		gap: 5px;
	}

	h1 {
		font-size: 2rem;
		font-family: 'Roboto Slab', sans-serif;
		margin: 0.5rem 0;
	}

	h2 {
		font-size: 1.25rem;
		color: #6b6b6b;
	}

	p {
		font-size: 1.5rem;
	}
</style>
