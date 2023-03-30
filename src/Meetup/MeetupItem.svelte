<script lang="ts">
	import Button from '../UI/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import Badge from '../UI/Badge.svelte';
	import meetups from '../Meetup/meetup-store';
	import { scale } from 'svelte/transition';
	//Props
	export let id: string = '';
	export let title: string = '';
	export let subtitle: string = '';
	export let imageUrl: string = '';
	export let description: string = '';
	export let address: string = '';
	export let email: string = '';
	export let isFavorite: boolean = false;

	const dispatch = createEventDispatcher();
	const favoriteHandler = () => {
		meetups.toggleFavorite(id);
	};
</script>

<article transition:scale>
	<header>
		<span class="edit" on:click={() => dispatch('edit-meetup', { id })}>Edit</span>
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
		<img src={imageUrl} alt={title} />
	</div>
	<div class="content">
		<p>{description}</p>
	</div>
	<footer>
		<Button href="mailto:{email}">Contact now</Button>
		<Button
			mode="outline"
			on:click={() => {
				dispatch('show-details', { id });
			}}>Show details</Button
		>
		<Button color={isFavorite ? null : 'success'} on:click={favoriteHandler}
			>{isFavorite ? 'Unfavorite' : 'Favorite'}
		</Button>
	</footer>
</article>

<style>
	article {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 5px;
		background: white;
		margin: 1rem;
	}
	header {
		position: relative;
	}
	.edit {
		border: 1px solid #01a129;
		background: #01a129;
		color: white;
		padding: 4px 8px;
		border-radius: 8px;
		position: absolute;
		right: 5%;
		cursor: pointer;
	}
	header,
	.content,
	footer {
		padding: 1rem;
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
