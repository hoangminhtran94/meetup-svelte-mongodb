<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import TextInput from '../UI/TextInput.svelte';
	import Modal from '../UI/Modal.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Button from '../UI/Button.svelte';
	import { notEmpty, isEmail } from '../helpers/validation';
	import meetups from '../Meetup/meetup-store';
	const dispatch = createEventDispatcher();
	export let id: string = '';
	let meetup: Meetup | undefined;

	const unsubscribe = meetups.subscribe((meetups) => {
		meetup = meetups.find((meetup) => meetup.id === id);
	});

	let formData: Meetup = {
		id: meetup ? meetup.id : '',
		title: meetup ? meetup.title : '',
		subtitle: meetup ? meetup.subtitle : '',
		description: meetup ? meetup.description : '',
		imageUrl: meetup ? meetup.imageUrl : '',
		address: meetup ? meetup.address : '',
		contactEmail: meetup ? meetup.contactEmail : '',
		isFavorite: meetup ? meetup.isFavorite : false
	};

	$: titleIsValid = notEmpty(formData.title);
	$: subtTitleIsValid = notEmpty(formData.subtitle);
	$: descriptionIsValid = notEmpty(formData.description);
	$: imageUrlIsValid = notEmpty(formData.imageUrl);
	$: addressIsValid = notEmpty(formData.address);
	$: emailIsValid = isEmail(formData.contactEmail);
	$: formIsValid =
		titleIsValid &&
		subtTitleIsValid &&
		descriptionIsValid &&
		imageUrlIsValid &&
		addressIsValid &&
		emailIsValid;

	const saveHandler = () => {
		if (!meetup) {
			meetups.addMeetup(formData);
		} else {
			meetups.editAMeetup(formData);
		}
		dispatch('save');
	};

	const inputChangeHandler = (event: Event, field: string) => {
		formData = {
			...formData,
			[field]: (event.target as HTMLInputElement | HTMLTextAreaElement).value
		};
	};
	const deleteHandler = () => {
		meetups.deleteAMeetup(id);
		dispatch('save');
	};

	onDestroy(() => {
		unsubscribe();
	});
</script>

<Modal title="Add new meetup" on:cancel>
	<form slot="modal-content">
		<TextInput
			id="title"
			validityMessage="Title is invalid"
			label="Title"
			valid={titleIsValid}
			value={formData.title}
			on:input={(event) => inputChangeHandler(event, 'title')}
		/>
		<TextInput
			id="subtitle"
			validityMessage="Subtitle is invalid"
			valid={subtTitleIsValid}
			label="Subtitle"
			value={formData.subtitle}
			on:input={(event) => inputChangeHandler(event, 'subtitle')}
		/>
		<TextInput
			id="address"
			validityMessage="Address is invalid"
			valid={addressIsValid}
			label="Address"
			value={formData.address}
			on:input={(event) => inputChangeHandler(event, 'address')}
		/>
		<TextInput
			id="image"
			validityMessage="Image Url is invalid"
			valid={imageUrlIsValid}
			label="Image URL"
			value={formData.imageUrl}
			on:input={(event) => inputChangeHandler(event, 'imageUrl')}
		/>
		<TextInput
			id="email"
			validityMessage="Email is invalid"
			valid={emailIsValid}
			label="Email"
			type="email"
			value={formData.contactEmail}
			on:input={(event) => inputChangeHandler(event, 'contactEmail')}
		/>
		<TextInput
			id="description"
			validityMessage="Description is invalid"
			valid={descriptionIsValid}
			label="Description"
			value={formData.description}
			controlType="textarea"
			on:input={(event) => inputChangeHandler(event, 'description')}
		/>
	</form>
	<div slot="modal-footer">
		<Button disabled={!formIsValid} on:click={saveHandler}>Save</Button>
		<Button
			on:click={() => {
				dispatch('cancel');
			}}>Cancel</Button
		>
		{#if meetup}
			<Button on:click={deleteHandler}>Delete</Button>
		{/if}
	</div>
</Modal>

<style>
	form {
		margin: auto;
	}
</style>
