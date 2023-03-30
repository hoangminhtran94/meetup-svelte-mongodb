<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import MeetupItem from './MeetupItem.svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	export let meetups: Meetup[] = [];
	export let showFavorite: boolean = false;
</script>

<section>
	{#each meetups as meetup (meetup.id)}
		<div transition:scale animate:flip={{ duration: 300 }}>
			<MeetupItem
				on:show-details
				on:edit-meetup
				id={meetup.id}
				title={meetup.title}
				subtitle={meetup.subtitle}
				imageUrl={meetup.imageUrl}
				description={meetup.description}
				address={meetup.address}
				email={meetup.contactEmail}
				isFavorite={meetup.isFavorite}
			/>
		</div>
	{/each}
</section>

<style>
	section {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
	}

	@media (min-width: 768px) {
		section {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
