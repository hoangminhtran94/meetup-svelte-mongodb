<script lang="ts">
	import Button from '../../UI/Button.svelte';
	import TextInput from '../../UI/TextInput.svelte';
	import { enhance } from '$app/forms';
	import ImageInput from '../../UI/ImageInput.svelte';
	let currentPage = 1;
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="w-1/2 mx-auto text-white">
	<form
		class="rounded flex flex-col border-indigo-950 p-10 border-[3px] bg-[rgba(79,70,229,0.1)] drop-shadow-white-sm"
		method="post"
		use:enhance={() => {
			return ({ result }) => {
				console.log(result);
			};
		}}
		action="?/register"
	>
		<h1 class="text-2xl font-bold mb-5">Create an account</h1>
		<div class="flex flex-col gap-5" class:hidden={currentPage === 2}>
			<TextInput label="Username or Email" id="email" />
			<TextInput label="Password" type="password" id="password" />
			<TextInput label="Confirm Password" type="password" id="confirmPassword" />
			<Button
				type="button"
				on:click={() => {
					currentPage = 2;
				}}
				className="w-1-3 mx-auto !mt-10">Next</Button
			>
		</div>
		<div class="flex gap-10" class:hidden={currentPage === 1}>
			<ImageInput name="profile-image" />
			<div class="flex-1 flex flex-col gap-5">
				<TextInput label="First name" id="firstName" />
				<TextInput label="Last name" id="lastName" />
				<TextInput label="Phone number" id="phone" />
				<TextInput label="Address" id="address" />
				<div class="register-actions mt-10">
					<Button
						type="button"
						mode="btn-alert-outline"
						className="w-1-3"
						on:click={() => {
							currentPage = 1;
						}}>Previous page</Button
					>
					<Button mode="btn-purple" type="submit" className="w-1-3 ">Register</Button>
				</div>
			</div>
		</div>

		<p class="mx-auto text-xs">
			Already have an account? <a href="/login" class="no-decoration">Login now</a>
		</p>
	</form>
</div>
