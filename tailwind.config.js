/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			dropShadow:{
				"white-sm":"0 0 35px rgba(255, 255, 255, 0.1)"
			}
		}
	},
	plugins: []
};
