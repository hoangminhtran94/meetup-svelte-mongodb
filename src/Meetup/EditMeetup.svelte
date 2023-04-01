<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import { toast } from '@zerodevx/svelte-toast';
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

	let file: Blob | null = null;

	$: titleIsValid = notEmpty(formData.title);
	$: subtTitleIsValid = notEmpty(formData.subtitle);
	$: descriptionIsValid = notEmpty(formData.description);
	$: addressIsValid = notEmpty(formData.address);
	$: emailIsValid = isEmail(formData.contactEmail);
	$: formIsValid =
		titleIsValid && subtTitleIsValid && descriptionIsValid && addressIsValid && emailIsValid;

	$: console.log(true.toString());
	const saveHandler = async () => {
		const submitData = new FormData();
		submitData.append('title', formData.title);
		submitData.append('subtitle', formData.subtitle);
		submitData.append('description', formData.description);
		submitData.append('image', file ?? '');
		submitData.append('address', formData.address);
		submitData.append('contactEmail', formData.contactEmail);
		submitData.append('isFavorite', formData.isFavorite.toString());
		if (!meetup) {
			let res;
			try {
				res = await fetch('http://localhost:5000/api/meetups', {
					method: 'POST',
					// headers: { 'Content-Type': 'multipart/form-data' },
					body: submitData
				});
			} catch (error) {
				return error;
			}
			if (res.ok) {
				const meetup = await res.json();
				meetups.addMeetup(meetup);
			} else {
				throw new Error('An error happened');
			}
		} else {
			let res;
			try {
				res = await fetch(`http://localhost:5000/api/meetups/${formData.id}`, {
					method: 'PUT',
					body: submitData
				});
			} catch (error) {
				console.log(error);
			}
			if (res?.ok) {
				meetups.editAMeetup({
					...formData,
					imageUrl: file ? URL.createObjectURL(file) : formData.imageUrl
				});
				toast.push('Updated successfully', {
					duration: 1500,
					theme: {
						'--toastBackground': 'white',
						'--toastColor': '#143787',
						'--toastBarBackground': '#143787',
						'--toastBtnContent': '',
						'--toastBorder': '1.5px solid #143787 '
					}
				});
			}
		}
		dispatch('save');
	};
	const inputChangeHandler = (event: Event, field: string) => {
		formData = {
			...formData,
			[field]: (event.target as HTMLInputElement | HTMLTextAreaElement).value
		};
	};
	const deleteHandler = async () => {
		let res;
		try {
			res = await fetch(`http://localhost:5000/api/meetups/${formData.id}`, {
				method: 'DELETE'
			});
		} catch (error) {
			console.log(error);
		}
		console.log(res);
		if (res?.ok) {
			meetups.deleteAMeetup(id);
		}

		dispatch('save');
	};
	const imageHandler = (event: Event) => {
		file = (event.target as HTMLInputElement).files![0];
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
		<label for="image">Images</label>
		<input
			id="image"
			name="image"
			type="file"
			accept=".jpg,.jpeg,.png,.avif"
			on:change={imageHandler}
		/>
		<!-- <TextInput
			id="image"
			validityMessage="Image Url is invalid"
			valid={imageUrlIsValid}
			label="Image URL"
			value={formData.imageUrl}
			on:input={(event) => inputChangeHandler(event, 'imageUrl')}
		/> -->
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
