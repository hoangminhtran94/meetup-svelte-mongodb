<script lang="ts">
	export let image = '';
	export let label = '';
	let inputRef: HTMLInputElement | null = null;
</script>

<div>
	{#if label}
		<label for="image">{label}</label>
	{/if}
	<div
		on:click={() => {
			inputRef?.click();
		}}
		on:keydown={() => {
			inputRef?.click();
		}}
		class="image-input mx-auto pointer"
	>
		{#if image}
			<img src={image} alt="profileImage" />
		{:else}
			Upload your image
		{/if}
		<input id="image" bind:this={inputRef} on:input type="file" class="hidden" />
	</div>
</div>

<style>
	label {
		display: block;
		margin-bottom: 0.5rem;
		width: 100%;
		font-size: 1.1rem;
		font-weight: 800;
	}

	.image-input {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200px;
		height: 200px;
		border: 1px solid #aaaaaa;
		border-radius: 8px;
		overflow: hidden;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
