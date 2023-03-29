<script lang="ts">
	import MeetupGrid from '../Meetup/MeetupGrid.svelte';
	import EditMeetup from '../Meetup/EditMeetup.svelte';

	import Button from '../UI/Button.svelte';
	import meetups from '../Meetup/meetup-store';
	import MeetupDetail from '../Meetup/MeetupDetail.svelte';
	let editMode: 'add' | 'edit' | null = null;
	let showDetails: boolean = false;
	let currentSelected: string = '';
</script>

<main>
	<div class="meetup-controls">
		<Button
			on:click={() => {
				editMode = 'add';
			}}
			>Add new meetup
		</Button>
	</div>
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

	<MeetupGrid
		meetups={$meetups}
		on:show-details={(e) => {
			showDetails = !showDetails;
			currentSelected = e.detail.id;
		}}
	/>
	{#if currentSelected && showDetails}
		<MeetupDetail
			id={currentSelected}
			on:close={() => {
				currentSelected = '';
				showDetails = false;
			}}
		/>
	{/if}
</main>

<style>
	.meetup-controls {
		padding: 1rem;
	}
</style>
