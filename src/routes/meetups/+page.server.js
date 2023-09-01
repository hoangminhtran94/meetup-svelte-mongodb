// export const prerender = true;
export const prerender = true;
import { getMeetups } from '../../../prisma/database/+meetup.server';

export async function load() {
	let response;
	/**
	 * @type {any[]}
	 */
	let meetups = [];
	try {
		response = await getMeetups();
		meetups = response;
	} catch (error) {
		meetups = [];
	}
	if (!response) {
		return [];
	}

	// try {
	// 	meetups = response.map((/** @type {{ imageUrl: string; }} */ mu) => {
	// 		return {
	// 			...mu,
	// 			imageUrl: 'http://localhost:5000/' + mu.imageUrl
	// 		};
	// 	});
	// 	return { meetups: meetups.reverse() };
	// } catch (error) {
	// 	meetups = [];
	// }

	return { meetups };
}
