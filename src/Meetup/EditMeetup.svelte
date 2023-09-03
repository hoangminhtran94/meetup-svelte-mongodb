<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import TextInput from '../UI/TextInput.svelte';
	import Modal from '../UI/Modal.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Button from '../UI/Button.svelte';
	import { notEmpty, isEmail } from '../helpers/validation';
	import ImageInput from '../UI/ImageInput.svelte';
	const dispatch = createEventDispatcher();
	export let id: string = '';
	let meetup: Meetup | undefined;
</script>

<Modal title="Add new meetup" on:cancel>
	<form class="flex flex-col gap-5" slot="modal-content">
		<ImageInput name="meetup-image" />
		<TextInput
			validCondition={notEmpty}
			id="title"
			validityMessage="Title is invalid"
			label="Title"
		/>
		<TextInput
			validCondition={notEmpty}
			id="subtitle"
			validityMessage="Subtitle is invalid"
			label="Subtitle"
		/>
		<TextInput
			validCondition={notEmpty}
			id="address"
			validityMessage="Address is invalid"
			label="Address"
		/>
		<TextInput
			id="description"
			validCondition={notEmpty}
			validityMessage="description is invalid"
			label="Description"
			controlType="textarea"
		/>
		<div class="flex gap-4 justify-center">
			<Button
				mode="btn-error"
				on:click={() => {
					dispatch('cancel');
				}}>Cancel</Button
			>
			<Button mode="btn-success">Save</Button>
		</div>
	</form>
</Modal>

<style>
	form {
		margin: auto;
	}
</style>
