// export const prerender = true;
export const prerender = true;

/** @type {import('./$types').PageLoad} */

export async function load({ fetch }) {
	let response;
	/**
	 * @type {any[]}
	 */
	let meetups = [];
	try {
		response = await fetch('http://localhost:5000/api/meetups');
	} catch (error) {
		meetups = [];
	}
	if (response?.ok) {
		try {
			const mus = await response.json();
			meetups = mus.map((/** @type {{ imageUrl: string; }} */ mu) => {
				return {
					...mu,
					imageUrl: 'http://localhost:5000/' + mu.imageUrl
				};
			});
			return { meetups: meetups.reverse() };
		} catch (error) {
			meetups = [];
		}
	}
	return { meetups };
}
