<script lang="ts">
	import { page } from '$app/stores';
	export let href: string = '';
	$: active = $page.url.pathname === href;
</script>

<li><a {href} class:active><slot /></a></li>

<style>
	a {
		font-size: 1.5em;
		text-decoration: none;
		font-weight: 800;
		color: white;
		opacity: 0.4;
	}
	.active {
		opacity: 1;
	}
</style>
