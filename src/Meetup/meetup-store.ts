import { writable } from 'svelte/store';
import type { Meetup } from '../utils/model/Meetup.model';
const meetups = writable<Meetup[]>([]);
const createMeetupStore = {
	subscribe: meetups.subscribe,
	addMeetup: (formData: Meetup) => {
		meetups.update((mus) => [{ ...formData }, ...mus]);
	},
	setMeetups: (mups: Meetup[]) => {
		meetups.set(mups);
	},
	editAMeetup: (formData: any) => {
		meetups.update((mus) => {
			const musClone = [...mus];
			const index = musClone.findIndex((mu) => mu.id === formData.id);
			musClone[index] = formData;
			return musClone;
		});
	},
	deleteAMeetup: (id: string) => {
		meetups.update((mus) => {
			return [...mus].filter((meetup) => meetup.id !== id);
		});
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
