<script lang="ts">
	import authReducer from '../../Auth/auth-store';
	import meetupReducer from '../../Meetup/meetup-store';
	import Redirecting from '../../UI/Redirecting.svelte';
	import { page } from '$app/stores';
	let yourMeetus = $meetupReducer.filter((meetup) => meetup.createrId === $authReducer.user?.id);
	$: user = $page.data.user;
</script>

<svelte:head>
	<title>Your Profile</title>
</svelte:head>

{#if $page.data.user}
	<div class="profile-container bg-your-profile">
		<h1>Your Profile</h1>

		<div class="image-container">
			<img src={$page.data.user.profileImage} alt="profile" />
		</div>
		<div class="content-container">
			<h2>{`${$page.data.user.email}`}</h2>
			<div class="info-container">
				<p>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
						/></svg
					>
					{$page.data.user.email}
				</p>
				<p>
					<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M384 48c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H384zM96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H208zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"
						/></svg
					>
					{$page.data.user.address}
				</p>
				<p>
					<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M0 64C0 28.7 28.7 0 64 0H256c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm64 96v64c0 17.7 14.3 32 32 32H224c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 352a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM128 48c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H128z"
						/></svg
					>
					{$page.data.user.phone}
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
<div class="absolute bottom-0 w-full -z-10">
	<svg
		id="visual"
		viewBox="0 0 900 600"
		class="w-full"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		><rect x="0" y="0" width="900" height="600" fill="#001220"></rect><path
			d="M0 411L21.5 415C43 419 86 427 128.8 421.3C171.7 415.7 214.3 396.3 257.2 383.8C300 371.3 343 365.7 385.8 371.8C428.7 378 471.3 396 514.2 409.7C557 423.3 600 432.7 642.8 430.3C685.7 428 728.3 414 771.2 401.7C814 389.3 857 378.7 878.5 373.3L900 368L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
			fill="#fa7268"
		></path><path
			d="M0 406L21.5 405.3C43 404.7 86 403.3 128.8 408.3C171.7 413.3 214.3 424.7 257.2 430.3C300 436 343 436 385.8 431.3C428.7 426.7 471.3 417.3 514.2 413.7C557 410 600 412 642.8 423.3C685.7 434.7 728.3 455.3 771.2 465.2C814 475 857 474 878.5 473.5L900 473L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
			fill="#ef5f67"
		></path><path
			d="M0 481L21.5 476.7C43 472.3 86 463.7 128.8 460.3C171.7 457 214.3 459 257.2 468.3C300 477.7 343 494.3 385.8 491.7C428.7 489 471.3 467 514.2 456.2C557 445.3 600 445.7 642.8 455.3C685.7 465 728.3 484 771.2 487.3C814 490.7 857 478.3 878.5 472.2L900 466L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
			fill="#e34c67"
		></path><path
			d="M0 532L21.5 527.8C43 523.7 86 515.3 128.8 514.2C171.7 513 214.3 519 257.2 517.8C300 516.7 343 508.3 385.8 505.3C428.7 502.3 471.3 504.7 514.2 504.7C557 504.7 600 502.3 642.8 498.5C685.7 494.7 728.3 489.3 771.2 489C814 488.7 857 493.3 878.5 495.7L900 498L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
			fill="#d53867"
		></path><path
			d="M0 538L21.5 537.2C43 536.3 86 534.7 128.8 538.3C171.7 542 214.3 551 257.2 555.5C300 560 343 560 385.8 559.5C428.7 559 471.3 558 514.2 558C557 558 600 559 642.8 557.2C685.7 555.3 728.3 550.7 771.2 550C814 549.3 857 552.7 878.5 554.3L900 556L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
			fill="#c62368"
		></path></svg
	>
</div>

<style>
	.bg-your-profile {
		background-image: url('/profile.png');
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
