import { writable } from 'svelte/store';
import type { User } from './../utils/model/User.model';

const authStore = writable<{ token: string | null; user: User | null }>({
	token: null,
	user: null
});

const authReducer = {
	subscribe: authStore.subscribe,
	setToken: (token: string) => {
		authStore.update((currentState) => {
			return { ...currentState, token: token };
		});
	},
	setUser: (user: User) => {
		authStore.update((currentState) => {
			return { ...currentState, user: user };
		});
	},
	logout: () => {
		authStore.set({
			token: null,
			user: null
		});
	}
};

export default authReducer;
