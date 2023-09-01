<script lang="ts">
	import NavLink from './NavLink.svelte';
	import auth from '../Auth/auth-store';

	const logoutHandler = () => {
		auth.logout();
		localStorage.removeItem('login-token');
	};
</script>

<header class="  relative z-10 w-full py-3  flex justify-start items-center ">
	<div class=" text-white font-bold text-lg px-10 flex-1"><a href="/">Meet Up</a></div>
	<ul class=" mx-auto flex gap-4  py-2 px-10 flex-1 ">
		<NavLink href="/meetups">Meetups</NavLink>
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
</style>
