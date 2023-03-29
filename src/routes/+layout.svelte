<script lang="ts">
	import Header from '../UI/Header.svelte';
</script>

<Header />
<slot />

<style>
	:global(body) {
		margin: 0 !important;
	}
</style>
