import { prisma } from './+db.server';

export const getMeetups = async () => {
	try {
		return await prisma.meetup.findMany();
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const addMeetup = async (data: any) => {
	try {
		return await prisma.meetup.create({
			data: {
				title: data.title,
				subtitle: data.subtitle,
				description: data.description,
				imageUrl: data.imageUrl,
				address: data.address,
				createrId: data.createrId,
				contactEmail: data.contactEmail,
				isFavorite: data.isFavorite
			}
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAMeetUp = async (id: string) => {
	try {
		return await prisma.meetup.findFirst({ where: { id } });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateMeetup = async (id: string, data: any) => {
	try {
		await prisma.meetup.update({ where: { id }, data: { ...data } });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteMeetup = async (id: string) => {
	try {
		await prisma.meetup.delete({ where: { id } });
	} catch (error) {
		console.log(error);
		throw error;
	}
};
