<script lang="ts">
	import MeetupGrid from '../Meetup/MeetupGrid.svelte';
	import EditMeetup from '../Meetup/EditMeetup.svelte';
	import Button from '../UI/Button.svelte';
	import meetups from '../Meetup/meetup-store';
	import MeetupDetail from '../Meetup/MeetupDetail.svelte';
	import Loading from '../UI/Loading.svelte';
	import type { Meetup } from '../utils/model/Meetup.model';
	import { onDestroy, onMount } from 'svelte';

	$: isLoading = true;
	onMount(async () => {
		let response;
		try {
			response = await fetch('http://localhost:5000/api/meetups');
		} catch (error) {
			isLoading = false;
			return error;
		}
		if (response.ok) {
			try {
				const mus = await response.json();
				const mappedMus = mus.map((mu: Meetup) => ({
					...mu,
					imageUrl: 'http://localhost:5000/' + mu.imageUrl
				}));
				meetups.setMeetups(mappedMus.reverse());
				isLoading = false;
			} catch (error) {
				isLoading = false;
				console.log(error);
			}
		}
	});

	let showFavorite: boolean = false;
	let meetupsList: Meetup[] = [];
	const unsubscribe = meetups.subscribe((mups) => {
		meetupsList = mups;
	});
	$: currentMeetups =
		showFavorite === false
			? meetupsList
			: meetupsList.filter((meetup) => meetup.isFavorite === true);
	let editMode: 'add' | 'edit' | null = null;
	let showDetails: boolean = false;
	let currentSelected: string = '';

	onDestroy(() => {
		unsubscribe();
	});
</script>

<main>
	<div class="meetup-controls">
		<Button
			on:click={() => {
				editMode = 'add';
			}}
			>Add new meetup
		</Button>
		<Button
			on:click={() => {
				showFavorite = !showFavorite;
			}}>Show Favorite</Button
		>
	</div>

	{#if isLoading}
		<Loading />
	{:else}
		<MeetupGrid
			{showFavorite}
			meetups={currentMeetups}
			on:edit-meetup={(e) => {
				editMode = 'edit';
				currentSelected = e.detail.id;
			}}
			on:show-details={(e) => {
				showDetails = !showDetails;
				currentSelected = e.detail.id;
			}}
		/>
	{/if}

	<!-- Modals -->
	{#if currentSelected && showDetails}
		<MeetupDetail
			id={currentSelected}
			on:close={() => {
				currentSelected = '';
				showDetails = false;
			}}
		/>
	{/if}

	{#if editMode === 'add'}
		<EditMeetup
			on:save={() => {
				editMode = null;
			}}
			on:cancel={() => {
				editMode = null;
			}}
		/>
	{/if}
	{#if editMode === 'edit'}
		<EditMeetup
			id={currentSelected}
			on:save={() => {
				editMode = null;
			}}
			on:cancel={() => {
				editMode = null;
			}}
		/>
	{/if}
</main>

<style>
	.meetup-controls {
		padding: 1rem;
	}
</style>
