
import { prisma } from './+db.server';
import type { Meetup } from '@prisma/client';

export const getMeetups = async () => {

	return await prisma.meetup.findMany();

};

export const addMeetup = async (data: Meetup) => {

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

};

export const getAMeetUp = async (id: string) => {

	return await prisma.meetup.findFirstOrThrow({ where: { id } });
};

export const updateMeetup = async (id: string, data: Meetup) => {
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
