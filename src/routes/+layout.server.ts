
import { getUserDataFromToken } from '../utils/+validate-cookie.server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const user = await getUserDataFromToken(cookies)
    return { user: user };
}) satisfies LayoutServerLoad;
