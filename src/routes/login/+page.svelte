<script lang="ts">
	import Button from '../../UI/Button.svelte';
	import TextInput from '../../UI/TextInput.svelte';
	import authReducer from '../../Auth/auth-store';
	import { goto } from '$app/navigation';

	let formData = {
		email: '',
		password: ''
	};

	let errorMessage = '';

	const inputHandler = (e: Event) => {
		const currentTarget = e.target as HTMLInputElement;
		formData = { ...formData, [currentTarget.name]: currentTarget.value };
	};
	const submitHandler = async () => {
		errorMessage = '';
		let res;
		try {
			res = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email,
					password: formData.password
				})
			});
		} catch (error) {
			console.log(error);
		}

		if (res?.ok) {
			try {
				const { token, ...userData } = await res.json();
				authReducer.setToken(token);
				authReducer.setUser(userData);
				localStorage.setItem('login-token', JSON.stringify({ ...userData, token }));
				goto('/');
			} catch (error) {
				console.log(error);
			}
		}
		if (!res?.ok) {
			const { error } = await res?.json();
			errorMessage = error;
		}
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="login-container mx-auto">
	<h1>Login</h1>
	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}
	<form on:submit|preventDefault={submitHandler}>
		<TextInput label="Username/Email" id="email" on:input={inputHandler} />
		<TextInput label="Password" type="password" id="password" on:input={inputHandler} />
		<Button type="submit" class="w-1-3 mx-auto">Login</Button>
		<p class="mx-auto ">
			Don't have an account? <a href="/register" class="no-decoration">Register now</a>
		</p>
	</form>
</div>

<style>
	h1 {
		text-align: center;
	}

	.login-container {
		background-color: rgba(255, 255, 255, 1);
		width: 95%;
		margin-top: 15vh;
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0px 0px 10px 4px rgba(255, 255, 255, 0.3);
	}
	@media (min-width: 640px) {
		.login-container {
			width: 70%;
		}
	}

	@media (min-width: 768px) {
		.login-container {
			width: 60%;
		}
	}
	@media (min-width: 1280px) {
		.login-container {
			width: 40%;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
	}
	p {
		font-size: small;
		margin-top: 0.5rem;
	}
</style>
