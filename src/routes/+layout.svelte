<script context="module">
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
</script>

<script lang="ts">
	import Header from '../UI/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';
</script>

<div class="root">
	<div class="filter" />
	<Header />
	<SvelteToast />
	<main>
		<slot/>
	</main>
</div>

<style>
	.root {
		position: relative;
		min-height: 100vh;
	}
	.filter {
		position: absolute;
		z-index: 0;
		background-image: url('https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
		background-size: cover;
		width: 100%;
		height: 100%;
		opacity: 0.9;
		filter: blur(10px);
	}
	main {
		position: relative;
		z-index: 10;
		padding: 1rem;
		margin: 0 auto;
		min-height: calc(100vh - 4rem);
		width: 100%;
	}
	@media (min-width: 768px) {
		main {
			padding: 2rem;
		}
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1440px) {
		main {
			width: 80%;
		}
	}
</style>
