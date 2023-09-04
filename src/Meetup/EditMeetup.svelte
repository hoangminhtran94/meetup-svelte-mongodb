<script lang="ts">
	import type { Meetup } from '@prisma/client';
	import TextInput from '../UI/TextInput.svelte';
	import Modal from '../UI/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../UI/Button.svelte';
	import { notEmpty } from '../helpers/validation';
	import ImageInput from '../UI/ImageInput.svelte';
	import { enhance } from '$app/forms';
	const dispatch = createEventDispatcher();
	export let meetup: Meetup | null = null;
	let formValid = {};
	const invalidHandler = (e: CustomEvent) => {
		formValid = { ...formValid, ...e.detail };
	};
	$: disabled = Object.values(formValid).length === 0 || Object.values(formValid).includes(false);
</script>

<Modal title="Add new meetup" on:cancel>
	<form class="flex flex-col gap-5" use:enhance method="post" slot="modal-content">
		<ImageInput defaultImage={meetup?.imageUrl} name="meetupImage" />
		<TextInput
			value={meetup?.title}
			validCondition={notEmpty}
			id="title"
			validityMessage="Title is invalid"
			label="Title"
			on:validity={invalidHandler}
		/>
		<TextInput
			value={meetup?.subtitle}
			validCondition={notEmpty}
			id="subtitle"
			validityMessage="Subtitle is invalid"
			label="Subtitle"
			on:validity={invalidHandler}
		/>
		<TextInput
			value={meetup?.address}
			validCondition={notEmpty}
			id="address"
			validityMessage="Address is invalid"
			label="Address"
			on:validity={invalidHandler}
		/>
		<TextInput
			value={meetup?.description}
			id="description"
			validCondition={notEmpty}
			validityMessage="description is invalid"
			label="Description"
			controlType="textarea"
			on:validity={invalidHandler}
		/>
		<div class="flex gap-4 justify-center">
			<Button
				mode="btn-error"
				on:click={() => {
					dispatch('cancel');
				}}>Cancel</Button
			>
			<Button {disabled} type="submit" mode="btn-success">Save</Button>
		</div>
	</form>
</Modal>

<style>
	form {
		margin: auto;
	}
</style>
