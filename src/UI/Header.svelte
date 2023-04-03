<script lang="ts">
	import NavLink from './NavLink.svelte';
	import auth from '../Auth/auth-store';

	const logoutHandler = () => {
		auth.logout();
		localStorage.removeItem('login-token');
	};
</script>

<header>
	<div><a href="/">Meet Us</a></div>
	<ul class="navbar">
		{#if $auth.user}
			<NavLink href="/your-profile">{$auth.user.firstName + ' ' + $auth.user.lastName}</NavLink>
			<span on:click={logoutHandler} on:keydown={logoutHandler}>Logout</span>
		{:else}
			<NavLink href="/login">Login</NavLink>
			<NavLink href="/register">Register</NavLink>
		{/if}
	</ul>
</header>

<style>
	header {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 4rem;
		background: linear-gradient(
			90deg,
			rgba(170, 170, 170, 1) 0%,
			rgba(120, 120, 120, 1) 20%,
			rgba(0, 0, 0, 1) 100%
		);
		display: flex;
		justify-self: flex-start;
		align-items: center;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
	}

	.navbar {
		margin: 0 auto;
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
	}
	div {
		width: 50%;
		display: flex;
		justify-content: flex-end;

		margin: 0;
	}
	a {
		font-size: xx-large;
		font-weight: 600;
		text-decoration: none;
		color: white;
	}
	span {
		font-size: 1.5em;
		text-decoration: none;
		font-weight: 800;
		color: white;
		opacity: 0.8;
		cursor: pointer;
	}
</style>
