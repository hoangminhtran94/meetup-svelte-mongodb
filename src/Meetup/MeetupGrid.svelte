<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import MeetupItem from './MeetupItem.svelte';
	export let meetups: Meetup[] = [];
</script>

<section>
	{#each meetups as meetup, i (meetup.id)}
		<MeetupItem
			on:show-details
			id={meetup.id}
			title={meetup.title}
			subtitle={meetup.subtitle}
			imageUrl={meetup.imageUrl}
			description={meetup.description}
			address={meetup.address}
			email={meetup.contactEmail}
			isFavorite={meetup.isFavorite}
		/>
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
