<script lang="ts">
	import Button from '../../UI/Button.svelte';
	import TextInput from '../../UI/TextInput.svelte';
	import { enhance } from '$app/forms';
	import cookies from 'js-cookie';
	import type { ActionResult } from '@sveltejs/kit';
	import authReducer from '../../Auth/auth-store';
	import { goto } from '$app/navigation';

	const resultHandler = () => {
		return ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				const data = result.data as { email: string; id: string; jwt_token: string };
				cookies.set('jwt_token', data.jwt_token);
				authReducer.setUser({ email: data.email, id: data.id });
				goto('/meetups', { invalidateAll: true });
			}
		};
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="w-1/2 mx-auto text-white">
	<form
		class="rounded flex flex-col border-indigo-950 p-10 border-[3px] bg-[rgba(79,70,229,0.1)] drop-shadow-white-sm"
		method="post"
		use:enhance={() => {
			return resultHandler();
		}}
	>
		<h1 class="text-2xl font-bold mb-5 mx-auto">Login</h1>
		<div class="flex flex-col gap-5">
			<TextInput label="Username/Email" id="email" />
			<TextInput label="Password" type="password" id="password" />
		</div>
		<Button type="submit" class="w-1-3 mx-auto !mt-10">Login</Button>
		<p class="mx-auto text-xs">
			Don't have an account? <a href="/register" class="no-decoration">Register now</a>
		</p>
	</form>
</div>

<style>
</style>
