<script lang="ts">
	import MeetupGrid from '../../Meetup/MeetupGrid.svelte';
	import EditMeetup from '../../Meetup/EditMeetup.svelte';
	import Button from '../../UI/Button.svelte';
	import type { PageData } from './$types';
	import MeetupDetail from '../../Meetup/MeetupDetail.svelte';
	import { page } from '$app/stores';
	import type { Meetup } from '@prisma/client';
	$: user = $page.data.user;
	// meetups.setMeetups(data.meetups);
	export let data: PageData;

	let showFavorite: boolean = false;
	let editMode: 'add' | 'edit' | null = null;
	let showDetails: boolean = false;
	let currentSelected: Meetup | null;
</script>

<svelte:head>
	<title>Home page</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	{#if user}
		<div class="flex justify-center gap-5">
			<Button
				className="flex gap-2"
				mode="btn-success"
				on:click={() => {
					editMode = 'add';
				}}
			>
				<svg width="20" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M33.6667 9.03605C19.8894 9.03605 8.7207 20.2047 8.7207 33.982V67.2433C8.7207 81.0205 19.8894 92.1892 33.6666 92.1892H66.9279C80.7052 92.1892 91.8739 81.0205 91.8739 67.2433V33.982C91.8739 20.2047 80.7052 9.03605 66.9279 9.03605H33.6667ZM17.036 33.982C17.036 24.7971 24.4818 17.3514 33.6667 17.3514H66.9279C76.1128 17.3514 83.5585 24.7971 83.5585 33.982V67.2433C83.5585 76.4281 76.1128 83.8739 66.9279 83.8739H33.6666C24.4818 83.8739 17.036 76.4281 17.036 67.2433V33.982ZM54.4549 33.982C54.4549 31.6858 52.5935 29.8243 50.2973 29.8243C48.0011 29.8243 46.1396 31.6858 46.1396 33.982V46.455H33.6666C31.3704 46.455 29.509 48.3164 29.509 50.6126C29.509 52.9088 31.3704 54.7703 33.6666 54.7703H46.1396V67.2433C46.1396 69.5395 48.0011 71.4009 50.2973 71.4009C52.5935 71.4009 54.4549 69.5395 54.4549 67.2433V54.7703H66.9279C69.2241 54.7703 71.0856 52.9088 71.0856 50.6126C71.0856 48.3164 69.2241 46.455 66.9279 46.455H54.4549V33.982Z"
						fill="white"
					/>
				</svg>

				Add new meetup
			</Button>
			<Button
				className="flex gap-2"
				mode="btn-purple"
				on:click={() => {
					showFavorite = !showFavorite;
				}}
			>
				<svg width="20" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M15.7138 54.5251L49.97 91.4005C50.3656 91.8264 51.0397 91.8264 51.4353 91.4005L85.6916 54.5251C94.4751 45.07 94.4751 29.7402 85.6916 20.2851C76.908 10.8299 62.667 10.8299 53.8835 20.2851L51.4353 22.9204C51.0397 23.3463 50.3656 23.3463 49.97 22.9204L47.5219 20.2851C38.7383 10.8299 24.4973 10.8299 15.7138 20.2851C6.93021 29.7402 6.93021 45.07 15.7138 54.5251Z"
						stroke="white"
						stroke-width="8.31532"
					/>
				</svg>

				Show Favorite</Button
			>
		</div>
	{/if}

	<MeetupGrid
		{showFavorite}
		meetups={data.meetups}
		on:edit-meetup={(e) => {
			editMode = 'edit';
			currentSelected = e.detail.currentMeetup;
		}}
		on:show-details={(e) => {
			showDetails = !showDetails;
			currentSelected = e.detail.id;
		}}
	/>

	<!-- Modals -->
	{#if currentSelected && showDetails}
		<MeetupDetail
			on:close={() => {
				currentSelected = null;
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
			meetup={currentSelected}
			on:save={() => {
				editMode = null;
			}}
			on:cancel={() => {
				editMode = null;
			}}
		/>
	{/if}
</div>
