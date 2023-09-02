import { prisma } from '../../prisma/database/+db.server';
import type { LayoutServerLoad } from './$types';
import { verify } from "jsonwebtoken"
export const load = (async ({ cookies }) => {
    const token = cookies.get("jwt_token")
    let user = null
    const secret = process.env.JWT_SECRET
    if (token && secret) {
        let decoded;
        try {
            decoded = verify(token, secret) as { id: string }
            const checkedUser = await prisma.user.findFirstOrThrow({ where: { id: decoded.id } })
            user = { email: checkedUser.email, firstName: checkedUser.firstName, lastName: checkedUser.lastName, id: checkedUser.id }
        } catch (error) {
            user = null;
        }
    }
    return { user: user };
}) satisfies LayoutServerLoad;