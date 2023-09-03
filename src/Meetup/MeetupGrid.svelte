<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import MeetupItem from './MeetupItem.svelte';
	export let meetups: Meetup[] = [];
	export let showFavorite: boolean = false;

	$: currentMeetups = showFavorite ? meetups.filter((meetup) => meetup.isFavorite) : meetups;
</script>

{#if currentMeetups.length === 0}
	<div class="no-meetup text-white text-center text-xl flex-1 flex items-center justify-center">
		There are no meetup
	</div>
{:else}
	<section class="">
		{#each currentMeetups as meetup (meetup.id)}
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
				createrId={meetup.createrId}
			/>
		{/each}
	</section>
{/if}

<style>
	.no-meetup {
		font-family: 'Starborn', sans-serif;
		margin: 1rem;
	}
	section {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 100vw));
		grid-gap: 1rem;
	}

	@media (min-width: 768px) {
		section {
			grid-template-columns: repeat(2, minmax(0, calc(50vw - 0.5rem)));
		}
	}

	@media (min-width: 1440px) {
		section {
			grid-template-columns: repeat(3, minmax(0, calc(33vw - 0.33rem)));
		}
	}
</style>
