import type { Actions, PageServerLoad } from './$types';
import { getMeetups, addMeetup } from '../../../prisma/database/+meetup.server';
import type { Meetup } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { getUserIdFromToken } from '../../utils/+validate-cookie.server';
import { fail } from '@sveltejs/kit';
import { prisma } from '../../../prisma/database/+db.server';
export const load = (async () => {
    let meetups: Meetup[] = [];
    try {
        meetups = await getMeetups();
    } catch (error) {
        meetups = [];
    }

    return { meetups };
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ request, cookies }) => {
        const user = getUserIdFromToken(cookies);
        if (!user) {
            return fail(403, { error: 'Unauthorized' });
        }

        const formdata = await request.formData();
        const data = Object.fromEntries(formdata) as unknown as Meetup;
        let imageUrl = '';
        const meetupImage = formdata.get('meetupImage') as File;
        if (meetupImage) {
            if (meetupImage.name && meetupImage.size > 0) {
                const bytes = await meetupImage.arrayBuffer();
                const buffers = Buffer.from(bytes);
                imageUrl = `upload/${v4()}.png`;
                const imagePath = path.join('static', imageUrl);
                fs.writeFileSync(imagePath, buffers);

            }
        }

        try {
            return await addMeetup({
                createrId: user.id,
                imageUrl,
                subtitle: data.subtitle,
                title: data.title,
                description: data.description,
                isFavorite: false,
                address: data.address
            });
        } catch (error) {
            return fail(500, { error: 'Something went wrong, please try again' });
        }
    },
    edit: async ({ request, cookies }) => {
        const user = getUserIdFromToken(cookies);
        if (!user) {
            return fail(403, { error: 'Unauthorized' });
        }

        const formdata = await request.formData();
        const data = Object.fromEntries(formdata) as unknown as Meetup;
        const meetupImage = formdata.get('meetupImage') as File;
        let currentMeetup;
        try {
            currentMeetup = await prisma.meetup.findFirstOrThrow({ where: { AND: [{ id: data.id }, { createrId: data.createrId }] } })

        } catch (error) {
            console.log(error)
            return fail(404, { message: "Not found" })
        }


        let imageUrl = currentMeetup.imageUrl;


        if (meetupImage) {
            if (meetupImage.name && meetupImage.size > 0) {
                const oldImagePath = path.join('static', imageUrl);
                fs.unlinkSync(oldImagePath)
                const bytes = await meetupImage.arrayBuffer();
                const buffers = Buffer.from(bytes);
                imageUrl = `upload/${v4()}.png`;
                const imagePath = path.join('static', imageUrl);
                fs.writeFileSync(imagePath, buffers);
            }
        }

        try {
            return await prisma.meetup.update({
                where: { id: data.id }, data: {
                    imageUrl,
                    subtitle: data.subtitle,
                    title: data.title,
                    description: data.description,
                    address: data.address
                }

            });
        } catch (error) {
            console.log(error)
            return fail(500, { error: 'Something went wrong, please try again' });
        }
    },
} satisfies Actions;
