<script lang="ts">
	import NavLink from './NavLink.svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	const logoutHandler = () => {
		cookie.remove('jwt_token');
		goto('/login', { invalidateAll: true });
	};
</script>

<header class="  relative z-10 w-full py-3 flex justify-start items-center">
	<div class=" text-white font-bold text-lg px-10 flex-1"><a href="/">Meet Up</a></div>
	<ul class=" mx-auto flex gap-4 py-2 px-10 flex-1">
		<NavLink href="/meetups">Meetups</NavLink>
		{#if $page.data.user}
			<NavLink href="/your-profile">{$page.data.user.email}</NavLink>
			<span
				class="text-white flex items-center cursor-pointer"
				on:click={logoutHandler}
				on:keydown={logoutHandler}>Logout</span
			>
		{:else}
			<NavLink href="/login">Login</NavLink>
			<NavLink href="/register">Register</NavLink>
		{/if}
	</ul>
</header>

<style>
</style>
