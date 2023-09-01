<script lang="ts">
	import { page } from '$app/stores';
	export let href: string = '';
	$: active = $page.url.pathname === href;
</script>

<li class={`nav-link ${active && 'active'}`}><a {href}><slot /></a></li>

<style>
</style>
