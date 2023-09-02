import { writable } from 'svelte/store';

const authStore = writable<{ token: string | null; user: { email: string, id: string } | null }>({
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
	setUser: (user: { email: string, id: string }) => {
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
