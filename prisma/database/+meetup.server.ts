
import { prisma } from './+db.server';
import type { Meetup } from '@prisma/client';
export interface MeetupCreateArgs {
	title: string,
	subtitle: string,
	description: string
	imageUrl: string
	address: string
	createrId: string
	isFavorite: boolean

}
export const getMeetups = async () => {

	return await prisma.meetup.findMany();

};

export const addMeetup = async (data: MeetupCreateArgs) => {

	return await prisma.meetup.create({
		data: {
			title: data.title,
			subtitle: data.subtitle,
			description: data.description,
			address: data.address,
			imageUrl: data.imageUrl,
			isFavorite: data.isFavorite,
			user: { connect: { id: data.createrId } }
		},
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
