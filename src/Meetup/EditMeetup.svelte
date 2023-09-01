<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';
	import TextInput from '../UI/TextInput.svelte';
	import Modal from '../UI/Modal.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Button from '../UI/Button.svelte';
	import { notEmpty, isEmail } from '../helpers/validation';
	import meetups from '../Meetup/meetup-store';
	import authReducer from '../Auth/auth-store';
	import ImageInput from '../UI/ImageInput.svelte';
	const dispatch = createEventDispatcher();
	export let id: string = '';
	let meetup: Meetup | undefined;

	const unsubscribe = meetups.subscribe((meetups) => {
		meetup = meetups.find((meetup) => meetup.id === id);
	});

	let formData = {
		id: meetup ? meetup.id : '',
		title: meetup ? meetup.title : '',
		subtitle: meetup ? meetup.subtitle : '',
		description: meetup ? meetup.description : '',
		address: meetup ? meetup.address : '',
		isFavorite: meetup ? meetup.isFavorite : false
	};

	let file: Blob | null = null;

	$: titleIsValid = notEmpty(formData.title);
	$: subtTitleIsValid = notEmpty(formData.subtitle);
	$: descriptionIsValid = notEmpty(formData.description);
	$: addressIsValid = notEmpty(formData.address);
	$: formIsValid = titleIsValid && subtTitleIsValid && descriptionIsValid && addressIsValid;

	const saveHandler = async () => {
		const submitData = new FormData();
		submitData.append('title', formData.title);
		submitData.append('subtitle', formData.subtitle);
		submitData.append('description', formData.description);
		submitData.append('image', file ?? '');
		submitData.append('address', formData.address);
		submitData.append('isFavorite', formData.isFavorite.toString());
		if (!meetup) {
			let res;
			try {
				res = await fetch('http://localhost:5000/api/meetups', {
					method: 'POST',
					headers: { Authorization: `Bearer ${$authReducer.token}` },
					body: submitData
				});
			} catch (error) {
				return error;
			}
			if (res.ok) {
				const meetup = await res.json();
				meetups.addMeetup({ ...meetup, imageUrl: 'http://localhost:5000/' + meetup.imageUrl });
			} else {
				throw new Error('An error happened');
			}
		} else {
			let res;
			try {
				res = await fetch(`http://localhost:5000/api/meetups/${formData.id}`, {
					method: 'PUT',
					headers: { Authorization: `Bearer ${$authReducer.token}` },
					body: submitData
				});
			} catch (error) {
				return error;
			}
			if (res.ok) {
				meetups.editAMeetup({
					...formData,
					createrId: meetup.createrId,
					imageUrl: file ? URL.createObjectURL(file) : meetup.imageUrl
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

		<!-- <TextInput
			id="image"
			validityMessage="Image Url is invalid"
			valid={imageUrlIsValid}
			label="Image URL"
			value={formData.imageUrl}
			on:input={(event) => inputChangeHandler(event, 'imageUrl')}
		/> -->
		<TextInput
			id="description"
			validityMessage="Description is invalid"
			valid={descriptionIsValid}
			label="Description"
			value={formData.description}
			controlType="textarea"
			on:input={(event) => inputChangeHandler(event, 'description')}
		/>
		<ImageInput
			label="Meetup image"
			image={meetup && !file ? meetup.imageUrl : file ? URL.createObjectURL(file) : ''}
			on:input={imageHandler}
		/>
	</form>
	<div slot="modal-footer" class="footer">
		<Button disabled={!formIsValid} on:click={saveHandler}>Save</Button>
		<Button
			on:click={() => {
				dispatch('cancel');
			}}>Cancel</Button
		>
	</div>
</Modal>

<style>
	form {
		margin: auto;
	}
	.footer {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
