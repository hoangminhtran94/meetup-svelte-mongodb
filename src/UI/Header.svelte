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

<header
	class="  relative z-10 w-[150px] py-3 bg-slate-800 px-5 flex flex-col justify-start items-center"
>
	<div class=" text-white font-bold text-lg"><a href="/">Meet Up</a></div>
	<nav class=" w-full flex flex-col items-center gap-4 flex-1">
		<NavLink href="/meetups">Meetups</NavLink>
		{#if $page.data.user}
			<NavLink href="/your-profile">
				<div class="w-[30px] h-[30px]">
					<img
						width="30"
						height="30"
						class="w-full h-full object-cover rounded-full"
						alt="profile-image"
						src={$page.data.user.profileImage}
					/>
				</div>
			</NavLink>
			<span
				class="text-white flex items-center cursor-pointer"
				on:click={logoutHandler}
				on:keydown={logoutHandler}>Logout</span
			>
		{:else}
			<NavLink href="/login">Login</NavLink>
			<NavLink href="/register">Register</NavLink>
		{/if}
	</nav>
</header>

<style>
</style>
