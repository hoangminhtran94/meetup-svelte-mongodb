<script lang="ts">
	export let controlType: string = 'input';
	export let id: string;
	export let label: string;
	export let rows: number = 3;
	export let value: string = '';
	export let type: 'text' | 'email' | 'number' | 'password' = 'text';
	export let valid: boolean = true;
	export let validityMessage: string = '';

	let touched = false;
</script>

<div class="form-control">
	<label for={id}>{label}</label>
	{#if controlType === 'textarea'}
		<textarea
			class:invalid={!valid && touched}
			name={id}
			{rows}
			{id}
			{value}
			on:input
			on:blur={() => {
				touched = true;
			}}
		/>
	{:else}
		<input
			class:invalid={!valid && touched}
			name={id}
			{type}
			{id}
			{value}
			on:input
			on:blur={() => {
				touched = true;
			}}
		/>
	{/if}

	{#if validityMessage && !valid && touched}
		<p class="error-message">{validityMessage}</p>
	{/if}
</div>

<div />

<style>
	input,
	textarea {
		display: block;
		width: 100%;
		font: inherit;
		border: none;
		border-bottom: 2px solid #ccc;
		border-radius: 3px 3px 0 0;
		background: white;
		padding: 0.15rem 0.25rem;
		transition: border-color 0.1s ease-out;
	}

	input:focus,
	textarea:focus {
		border-color: #e40763;
		outline: none;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		width: 100%;
		font-size: 1.1rem;
		font-weight: 800;
	}

	.form-control {
		padding: 0.5rem 0;
		width: 100%;
		margin: 0.25rem 0;
	}
	.invalid {
		border-color: red;
		background: #fde3e3;
	}
	.error-message {
		color: red;
		margin: 0.25rem 0;
	}
</style>
