<script lang="ts">
	import Button from '../../UI/Button.svelte';
	import TextInput from '../../UI/TextInput.svelte';
	import authReducer from '../../Auth/auth-store';
	import { goto } from '$app/navigation';
	import ImageInput from '../../UI/ImageInput.svelte';
	let currentPage = 1;
	let formData = {
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		phone: '',
		address: ''
	};
	let file: Blob | null = null;
	$: console.log(formData);
	const inputHandler = (e: Event) => {
		const currentTarget = e.target as HTMLInputElement;
		formData = { ...formData, [currentTarget.name]: currentTarget.value };
	};
	const imageSelectionHandler = (e: Event) => {
		file = (e.target as HTMLInputElement).files![0];
	};
	const submitHandler = async () => {
		let res;
		const submitData = new FormData();
		submitData.append('email', formData.email);
		submitData.append('password', formData.password);
		submitData.append('firstName', formData.firstName);
		submitData.append('lastName', formData.lastName);
		submitData.append('phone', formData.phone);
		submitData.append('address', formData.address);
		submitData.append('image', file ?? '');
		try {
			res = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				body: submitData
			});
		} catch (error) {
			console.log(error);
		}

		if (res?.ok) {
			try {
				const { token, ...userData } = await res.json();
				localStorage.setItem('login-token', JSON.stringify({ ...userData, token }));
				authReducer.setToken(token);
				authReducer.setUser(userData);
				goto('/');
			} catch (error) {
				console.log(error);
			}
		}
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="login-container">
	<h1>Create an account</h1>
	<form on:submit|preventDefault={submitHandler}>
		{#if currentPage === 1}
			<TextInput label="Username or Email" id="email" on:input={inputHandler} />

			<TextInput label="Password" type="password" id="password" on:input={inputHandler} />
			<TextInput
				label="Confirm Password"
				type="password"
				id="confirmPassword"
				on:input={inputHandler}
			/>
			<Button
				type="button"
				on:click={() => {
					currentPage = 2;
				}}
				class="w-1-3 mx-auto">Next</Button
			>
		{:else}
			<ImageInput image={file ? URL.createObjectURL(file) : ''} on:input={imageSelectionHandler} />
			<TextInput label="First name" id="firstName" on:input={inputHandler} />
			<TextInput label="Last name" id="lastName" on:input={inputHandler} />
			<TextInput label="Phone number" id="phone" on:input={inputHandler} />
			<TextInput label="Address" id="address" on:input={inputHandler} />
			<div class="register-actions">
				<Button
					type="button"
					mode="outline"
					class="w-1-3"
					on:click={() => {
						currentPage = 1;
					}}>Previous page</Button
				>
				<Button type="submit" class="w-1-3 ">Register</Button>
			</div>
		{/if}

		<p class="mx-auto ">
			Already have an account? <a href="/login" class="no-decoration">Login now</a>
		</p>
	</form>
</div>

<style>
	h1 {
		text-align: center;
	}
	.login-container {
		width: 95%;
		margin: 0 auto;
		margin-top: 1rem;
		padding: 2rem;
		box-shadow: 2px 4px 10px 2px rgba(0, 0, 0, 0.1);
	}
	.register-actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
	@media (min-width: 640px) {
		.login-container {
			width: 80%;
		}
	}

	@media (min-width: 768px) {
		.login-container {
			width: 70%;
		}
	}
	@media (min-width: 1280px) {
		.login-container {
			width: 60%;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	p {
		font-size: small;
		margin-top: 0.5rem;
	}
</style>
