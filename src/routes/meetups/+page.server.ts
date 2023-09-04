import type { Actions, PageServerLoad } from './$types';
import { getMeetups, addMeetup } from '../../../prisma/database/+meetup.server';
import type { Meetup } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { getUserIdFromToken } from '../../utils/+validate-cookie.server';
import { fail } from '@sveltejs/kit';
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
    default: async ({ request, cookies }) => {
        const user = getUserIdFromToken(cookies);
        if (!user) {
            return fail(403, { error: 'Unauthorized' });
        }

        const formdata = await request.formData();
        const data = Object.fromEntries(formdata) as unknown as Meetup;
        let imageUrl = '';
        const meetupImage = formdata.get('meetupImage') as File;
        if (meetupImage) {
            const bytes = await meetupImage.arrayBuffer();
            const buffers = Buffer.from(bytes);
            imageUrl = `upload/${v4()}.png`;
            const imagePath = path.join('static', imageUrl);
            fs.writeFileSync(imagePath, buffers);
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
    }
} satisfies Actions;
