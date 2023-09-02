<script lang="ts">
	export let name = '';
	export let label = '';
	let file: File | null = null;
	$: image = file ? URL.createObjectURL(file) : '';
</script>

<div>
	{#if label}
		<label for="image">{label}</label>
	{/if}
	<label class="image-input mx-auto rounded-full pointer">
		{#if image}
			<img src={image} alt="profileImage" />
		{:else}
			Upload your image
		{/if}
		<input
			{name}
			id="image"
			on:input={(e) => {
				file = e.currentTarget.files ? e.currentTarget.files[0] : null;
			}}
			multiple={false}
			type="file"
			class="hidden"
		/>
	</label>
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
		overflow: hidden;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
