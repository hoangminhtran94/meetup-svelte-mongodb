<script lang="ts">
	export let controlType: string = 'input';
	export let id: string;
	export let label: string;
	export let rows: number = 3;
	export let value: string = '';
	export let type: 'text' | 'email' | 'number' | 'password' = 'text';

	export let validityMessage: string = '';
	export let validCondition: ((input: string) => boolean) | null = null;
	let currentValue = '';
	let touched = false;
	$: valid = validCondition ? validCondition(currentValue) : true;
</script>

<div class="relative">
	{#if controlType === 'textarea'}
		<textarea
			class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-white
		bg-[rgba(59,130,246,0.05)] dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none
		 dark:text-white dark:border-gray-600
		  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
			on:blur={() => {
				touched = true;
			}}
			on:invalid
		/>
		<label
			class:label-invalid={!valid && touched}
			for={id}
			class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
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
			on:blur={() => {
				touched = true;
			}}
			aria-invalid={valid}
			class:invalid={!valid && touched}
			class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-white
			 bg-[rgba(59,130,246,0.05)] dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none
			  dark:text-white dark:border-gray-600
			   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
			placeholder=" "
		/>
		<label
			class:label-invalid={!valid && touched}
			for={id}
			class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
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
