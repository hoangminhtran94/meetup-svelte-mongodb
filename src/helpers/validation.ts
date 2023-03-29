export const notEmpty = (input: string) => {
	return input.trim().length > 0;
};

export const isEmail = (input: string) => {
	return new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(
		input
	);
};
