<script lang="ts">
	import Button from '../UI/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import Badge from '../UI/Badge.svelte';
	import meetups from '../Meetup/meetup-store';
	import authReducer from '../Auth/auth-store';

	//Props
	export let id: string = '';
	export let title: string = '';
	export let subtitle: string = '';
	export let imageUrl: string = '';
	export let description: string = '';
	export let address: string = '';
	export let email: string = '';
	export let isFavorite: boolean = false;
	export let createrId: string = '';

	const dispatch = createEventDispatcher();
	const favoriteHandler = async () => {
		let res;
		try {
			res = await fetch(`http://localhost:5000/api/meetups/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${$authReducer.token}`
				},
				body: JSON.stringify({
					isFavorite: !isFavorite
				})
			});
		} catch (error) {
			console.log(error);
		}
		console.log(res);
		if (res?.ok) {
			meetups.toggleFavorite(id);
		}
	};
	const deleteHandler = async () => {
		let res;
		try {
			res = await fetch(`http://localhost:5000/api/meetups/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${$authReducer.token}` }
			});
		} catch (error) {
			console.log(error);
		}
		console.log(res);
		if (res?.ok) {
			meetups.deleteAMeetup(id);
		}

		dispatch('save');
	};
</script>

<article>
	<header>
		{#if createrId === $authReducer.user?.id}
			<span class="edit"
				><svg
					on:keydown={() => dispatch('edit-meetup', { id })}
					on:click={() => dispatch('edit-meetup', { id })}
					width="24"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
					/></svg
				>
				<svg
					on:click={deleteHandler}
					on:keydown={deleteHandler}
					width="24"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
					fill="red"
					viewBox="0 0 448 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
					/></svg
				>
			</span>
		{/if}

		<h1>
			{title}
			{#if isFavorite}
				<Badge>FAVORITE</Badge>
			{/if}
		</h1>
		<h2>{subtitle}</h2>
		<h1>{address}</h1>
	</header>
	<div class="image">
		<img src={`${imageUrl}`} alt={title} />
	</div>
	<div class="content">
		<p>{description}</p>
	</div>
	<footer>
		<Button href="mailto:{email}"
			><svg
				fill="white"
				width="20"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
				/></svg
			></Button
		>
		<Button
			mode="outline"
			on:click={() => {
				dispatch('show-details', { id });
			}}
		>
			<svg
				fill="#e40763"
				width="15"
				height="15"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 192 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
				/></svg
			>
		</Button>
		<Button color={isFavorite ? null : 'success'} on:click={favoriteHandler}>
			{#if !isFavorite}
				<svg
					fill="white"
					width="20"
					height="20"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
					/></svg
				>
			{:else}
				<svg
					fill="white"
					width="20"
					height="20"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"
					/></svg
				>
			{/if}
		</Button>
	</footer>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 5px;
		background: white;
		padding: 0.5rem;
		height: 100%;
	}
	header {
		position: relative;
	}
	.edit {
		position: absolute;
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		right: 5%;
	}
	.edit svg {
		cursor: pointer;
	}
	.edit svg:hover {
		transform: scale(1.2);
	}
	header,
	.content,
	footer {
		padding: 1rem;
	}

	footer {
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: auto;
	}

	.content {
		width: 100%;
	}
	.content p {
		max-width: 100%;
		text-align: start;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.image {
		width: 100%;
		height: 14rem;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	h1 {
		font-size: 1.25rem;
		margin: 0.5rem 0;
		font-family: 'Roboto Slab', sans-serif;
	}

	h1.is-favorite {
		background: #01a129;
		color: white;
		padding: 0 0.5rem;
		border-radius: 5px;
	}

	h2 {
		font-size: 1rem;
		color: #808080;
		margin: 0.5rem 0;
	}

	p {
		font-size: 1.25rem;
		margin: 0;
	}

	div {
		text-align: right;
	}
	.content {
		height: 4rem;
	}
</style>
