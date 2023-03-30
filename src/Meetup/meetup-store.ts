import { writable } from 'svelte/store';
import type { Meetup } from '../utils/model/Meetup.model';
const meetups = writable([
	{
		id: 'm1',
		title: 'Coding bootcamp',
		subtitle: 'Learn to code in 2 hours',
		description: 'This is a description',
		imageUrl:
			'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
		address: '27th Nerd Road',
		contactEmail: 'code@test.com',
		isFavorite: false
	},
	{
		id: 'm2',
		title: 'Coding bootcamp',
		subtitle: 'Learn to code in 2 hours',
		description: 'This is a description',
		imageUrl:
			'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
		address: '28th Nerd Road',
		contactEmail: 'code@test.com',
		isFavorite: false
	},
	{
		id: 'm3',
		title: 'Coding bootcamp',
		subtitle: 'Learn to code in 2 hours',
		description: 'This is a description',
		imageUrl:
			'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
		address: '29th Nerd Road',
		contactEmail: 'code@test.com',
		isFavorite: false
	}
]);
const createMeetupStore = {
	subscribe: meetups.subscribe,
	addMeetup: (formData: Meetup) => {
		meetups.update((mus) => [...mus, { ...formData, id: Math.random().toString() }]);
	},
	toggleFavorite: (id: string) => {
		meetups.update((mus) => {
			const musClone = [...mus];
			const index = musClone.findIndex((meetup) => meetup.id === id);
			const currentFavorite = musClone[index].isFavorite;
			musClone[index] = { ...musClone[index], isFavorite: !currentFavorite };
			return musClone;
		});
	}
};

export default createMeetupStore;
