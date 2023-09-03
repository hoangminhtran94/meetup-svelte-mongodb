<script lang="ts">
	import { page } from '$app/stores';
	export let className = '';
	export let href: string = '';
	$: active = $page.url.pathname === href;
</script>

<div class={`nav-link ${active && 'active'}`}><a class={className} {href}><slot /></a></div>

<style>
</style>
