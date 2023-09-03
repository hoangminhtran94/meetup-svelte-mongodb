<!-- <script context="module">
	import { browser } from '$app/environment';
	import '../app.css';
	import authReducer from '../Auth/auth-store';
	if (browser) {
		const persistedToken = localStorage.getItem('login-token');
		if (persistedToken) {
			const data = JSON.parse(persistedToken);
			const { token, ...userData } = data;
			authReducer.setUser(userData);
			authReducer.setToken(token);
		}
	}
</script> -->

<script lang="ts">
	import Header from '../UI/Header.svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import FooterImage from '../UI/FooterImage.svelte';

	$: path = $page.url.pathname;

	$: console.log(path);
</script>

<div class="min-h-screen bg-[#001220] relative z-10 flex">
	<Header />
	<main class="relative flex flex-col flex-1 py-10">
		<slot />
		<FooterImage />
	</main>
</div>

<style>
</style>
