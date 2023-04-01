<script lang="ts">
	import Header from '../UI/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<Header />
<SvelteToast />
<slot />

<style>
	:global(body) {
		margin: 0 !important;
	}
</style>
