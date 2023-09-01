import type { PageServerLoad, Actions } from './register/$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    register:async ({request})=>{
        const formData = await request.formData();
        const data = Object.fromEntries(formData)
        console.log(data)

        return {
            message:"Success"
        }
    }
} satisfies Actions