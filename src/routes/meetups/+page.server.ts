import type { PageServerLoad } from './$types';
import { getMeetups } from '../../../prisma/database/+meetup.server';
import type { Meetup } from '@prisma/client';
export const load = (async () => {
    let meetups: Meetup[] = []
    try {
        meetups = await getMeetups();

    } catch (error) {
        meetups = [];
    }

    return { meetups };
}) satisfies PageServerLoad;