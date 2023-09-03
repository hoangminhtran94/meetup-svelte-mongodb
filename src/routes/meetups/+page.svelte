<script lang="ts">
	import MeetupGrid from '../../Meetup/MeetupGrid.svelte';
	import EditMeetup from '../../Meetup/EditMeetup.svelte';
	import Button from '../../UI/Button.svelte';
	import meetups from '../../Meetup/meetup-store';
	import MeetupDetail from '../../Meetup/MeetupDetail.svelte';
	import { page } from '$app/stores';
	$: user = $page.data.user;
	// meetups.setMeetups(data.meetups);

	let showFavorite: boolean = false;

	let editMode: 'add' | 'edit' | null = null;
	let showDetails: boolean = false;
	let currentSelected: string = '';
</script>

<svelte:head>
	<title>Home page</title>
</svelte:head>

{#if user}
	<div class="flex justify-center gap-5">
		<Button
			mode="btn-success"
			on:click={() => {
				editMode = 'add';
			}}
			>Add new meetup
		</Button>
		<Button
			mode="btn-purple"
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

<div class="absolute bottom-0 w-full -z-10">
	<svg
		id="visual"
		viewBox="0 0 960 540"
		class="w-full"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		><path
			d="M0 326L22.8 329.2C45.7 332.3 91.3 338.7 137 350C182.7 361.3 228.3 377.7 274 380.8C319.7 384 365.3 374 411.2 365C457 356 503 348 548.8 351C594.7 354 640.3 368 686 377.3C731.7 386.7 777.3 391.3 823 381.7C868.7 372 914.3 348 937.2 336L960 324L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
			fill="#fa69a6"
		></path><path
			d="M0 363L22.8 366.3C45.7 369.7 91.3 376.3 137 378C182.7 379.7 228.3 376.3 274 377.8C319.7 379.3 365.3 385.7 411.2 390.7C457 395.7 503 399.3 548.8 394.2C594.7 389 640.3 375 686 375.5C731.7 376 777.3 391 823 394.8C868.7 398.7 914.3 391.3 937.2 387.7L960 384L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
			fill="#dd58b1"
		></path><path
			d="M0 417L22.8 422.5C45.7 428 91.3 439 137 440.5C182.7 442 228.3 434 274 427.7C319.7 421.3 365.3 416.7 411.2 417.7C457 418.7 503 425.3 548.8 425.8C594.7 426.3 640.3 420.7 686 422C731.7 423.3 777.3 431.7 823 435.7C868.7 439.7 914.3 439.3 937.2 439.2L960 439L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
			fill="#b64ebb"
		></path><path
			d="M0 447L22.8 452.7C45.7 458.3 91.3 469.7 137 475.8C182.7 482 228.3 483 274 479.7C319.7 476.3 365.3 468.7 411.2 465.5C457 462.3 503 463.7 548.8 459C594.7 454.3 640.3 443.7 686 441.2C731.7 438.7 777.3 444.3 823 449.5C868.7 454.7 914.3 459.3 937.2 461.7L960 464L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
			fill="#824bc3"
		></path><path
			d="M0 496L22.8 496.3C45.7 496.7 91.3 497.3 137 500C182.7 502.7 228.3 507.3 274 503.7C319.7 500 365.3 488 411.2 486.2C457 484.3 503 492.7 548.8 493.7C594.7 494.7 640.3 488.3 686 487.7C731.7 487 777.3 492 823 493C868.7 494 914.3 491 937.2 489.5L960 488L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
			fill="#244bc7"
		></path></svg
	>
</div>

<style>
	.meetup-controls {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}
</style>
