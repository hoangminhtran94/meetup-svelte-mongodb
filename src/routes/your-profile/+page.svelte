<script lang="ts">
	import authReducer from '../../Auth/auth-store';
	import { goto } from '$app/navigation';
	import meetupReducer from '../../Meetup/meetup-store';
	import Redirecting from '../../UI/Redirecting.svelte';

	let yourMeetus = $meetupReducer.filter((meetup) => meetup.createrId === $authReducer.user?.id);
	$: !$authReducer.user ? goto('/') : null;
</script>

<svelte:head>
	<title>Your Profile</title>
</svelte:head>

{#if $authReducer.user}
	<div class="profile-container bg-your-profile">
		<h1>Your Profile</h1>

		<div class="image-container">
			<img src={'http://localhost:5000/' + $authReducer.user.profileImage} alt="profile" />
		</div>
		<div class="content-container">
			<h2>{`${$authReducer.user.firstName} ${$authReducer.user.lastName}`}</h2>
			<div class="info-container">
				<p>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
						/></svg
					>
					{$authReducer.user.email}
				</p>
				<p>
					<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M384 48c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H384zM96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H208zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"
						/></svg
					>
					{$authReducer.user.address}
				</p>
				<p>
					<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M0 64C0 28.7 28.7 0 64 0H256c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm64 96v64c0 17.7 14.3 32 32 32H224c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 352a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM128 48c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H128z"
						/></svg
					>
					{$authReducer.user.phone}
				</p>
				<p>
					<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z"
						/></svg
					>
					Number of your meetups: {yourMeetus.length}
				</p>
			</div>
		</div>
	</div>
{:else}
	<Redirecting />
{/if}

<style>
	.bg-your-profile {
		background-image: url('https://plus.unsplash.com/premium_photo-1673803529478-c155a34d8b45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
		background-color: black;
		background-size: cover;
	}

	h1 {
		color: white;
	}

	h2 {
		color: white;
		font-size: 40px;
	}

	.profile-container {
		border-radius: 8px;
		width: 95%;
		margin: 0 auto;
		padding: 2rem 3rem 3rem 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
		box-shadow: 2px 4px 10px 2px rgba(0, 0, 0, 0.1);
	}
	.content-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}
	.info-container {
		width: 90%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.info-container p {
		display: flex;
		align-items: center;
		color: white;
		gap: 1rem;
	}
	.info-container svg {
		fill: white;
	}
	@media (min-width: 640px) {
		.profile-container {
			width: 70%;
		}
	}

	@media (min-width: 768px) {
		.profile-container {
			width: 60%;
		}
	}
	@media (min-width: 1028px) {
		.profile-container {
			width: fit-content;
		}
	}
	.image-container {
		width: 200px;
		height: 200px;
	}
	img {
		border-radius: 50%;
		object-fit: cover;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
	}
</style>
