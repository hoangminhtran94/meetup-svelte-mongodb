<script lang="ts">
	import MeetupGrid from '../Meetup/MeetupGrid.svelte';
	import EditMeetup from '../Meetup/EditMeetup.svelte';
	import Button from '../UI/Button.svelte';
	import meetups from '../Meetup/meetup-store';
	import MeetupDetail from '../Meetup/MeetupDetail.svelte';
	import authReducer from '../Auth/auth-store';
	/** @type {import('./$types').PageData} */
	export let data: any;

	meetups.setMeetups(data.meetups);

	let showFavorite: boolean = false;

	let editMode: 'add' | 'edit' | null = null;
	let showDetails: boolean = false;
	let currentSelected: string = '';
</script>

<svelte:head>
	<title>Home page</title>
</svelte:head>

{#if $authReducer.user}
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
{/if}

<MeetupGrid
	{showFavorite}
	meetups={$meetups}
	on:edit-meetup={(e) => {
		editMode = 'edit';
		currentSelected = e.detail.id;
	}}
	on:show-details={(e) => {
		showDetails = !showDetails;
		currentSelected = e.detail.id;
	}}
/>

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

<style>
	.meetup-controls {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}
</style>
