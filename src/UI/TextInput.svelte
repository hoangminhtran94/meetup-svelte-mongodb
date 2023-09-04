<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let controlType: string = 'input';
	export let id: string;
	export let label: string;
	export let rows: number = 3;
	export let value: string = '';
	export let type: 'text' | 'email' | 'number' | 'password' = 'text';
	const dispatch = createEventDispatcher();
	export let validityMessage: string = '';
	export let validCondition: ((input: string) => boolean) | null = null;
	let currentValue = '';
	let touched = false;
	$: valid = validCondition ? validCondition(currentValue) : true;
	onMount(() => {
		dispatch('validity', { [id]: valid });
	});
	$: dispatch('validity', { [id]: valid });
</script>

<div class="relative">
	{#if controlType === 'textarea'}
		<textarea
			class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-white
		bg-[rgba(133,139,139,0.4)] dark:bg-gray-700 border-0 border-b-2 rounded-t-md border-gray-300 appearance-none
		 dark:text-white dark:border-gray-600
		  dark:focus:border-cyan-400 focus:outline-none focus:ring-0 focus:border-cyan-400 peer"
			placeholder=" "
			aria-invalid={valid}
			class:invalid={!valid && touched}
			name={id}
			{rows}
			{id}
			{value}
			on:input={(e) => {
				currentValue = e.currentTarget.value;
			}}
			on:blur={(e) => {
				touched = true;
			}}
			on:invalid
		/>
		<label
			class:label-invalid={!valid && touched}
			for={id}
			class="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5
			 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
			>{label}</label
		>
	{:else}
		<input
			{type}
			{id}
			{value}
			name={id}
			on:invalid
			on:input={(e) => {
				currentValue = e.currentTarget.value;
			}}
			on:blur={(e) => {
				touched = true;
			}}
			aria-invalid={valid}
			class:invalid={!valid && touched}
			class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-white
			bg-[rgba(133,139,139,0.4)] dark:bg-gray-700 border-0 border-b-2 rounded-t-md border-gray-300 appearance-none
			  dark:text-white dark:border-gray-600
			   dark:focus:border-cyan-200 focus:outline-none focus:ring-0 focus:border-y-cyan-200 peer"
			placeholder=" "
		/>
		<label
			class:label-invalid={!valid && touched}
			for={id}
			class="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5
			 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
			>{label}</label
		>
	{/if}

	{#if validityMessage && !valid && touched}
		<p class="error-message text-[10px] mt-2">{validityMessage}</p>
	{/if}
</div>

<style>
	.label-invalid {
		color: rgb(247, 93, 93);
	}
	.invalid {
		border-color: red;
		background: rgba(184, 133, 133, 0.5);
	}
	.error-message {
		color: rgb(254, 121, 121);
	}
</style>
