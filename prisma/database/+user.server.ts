import { prisma } from './+db.server';

export const createAUser = async (data: any) => {
	return await prisma.user.create({
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			profileImage: data.profileImage,
			phone: data.phone,
			address: data.address,
			email: data.email,
			password: data.password
		}
	});
};

export const getAUser = async (email: string) => {
	return await prisma.user.findFirst({
		where: { email: email }
	});
};

export const getAUserById = async (id: string) => {
	return await prisma.user.findFirst({ where: { id } });
};
