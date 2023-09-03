<script lang="ts">
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' = 'button';
	export let mode:
		| 'btn-primary'
		| 'btn-dark'
		| 'btn-success'
		| 'btn-alert-outline'
		| 'btn-error-outline'
		| 'btn-error'
		| 'btn-purple'
		| 'btn-primary-outline' = 'btn-primary';
	export let color: string | null = null;
	export let disabled: boolean = false;
	export let className: string = '';
</script>

{#if href}
	<a {href}><slot /></a>
{:else}
	<button class="{mode} {color} {className} " {type} on:click {disabled}>
		<slot />
	</button>
{/if}

<style>
</style>
