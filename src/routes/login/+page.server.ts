import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '../../../prisma/database/+db.server';
import { compareSync } from "bcrypt"
import { sign } from "jsonwebtoken"

export const prerender = false
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData) as { email: string, password: string }

        let user
        try {
            user = await prisma.user.findFirstOrThrow({ where: { email: data.email } })
        } catch (error) {
            return fail(404, { error: "Not found" })
        }
        const checkPassword = compareSync(data.password, user.password);
        const secret = process.env.JWT_SECRET
        if (!checkPassword || !secret) {
            return fail(403, { message: "Authentication failed" })
        }
        const token = sign({ id: user.id }, secret, { expiresIn: "24h" })
        return { user: { email: user.email, id: user.id }, jwt_token: token }
    }
} satisfies Actions