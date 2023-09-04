import type { Cookies } from "@sveltejs/kit";
import { verify } from "jsonwebtoken";
import { prisma } from "../../prisma/database/+db.server";


export const getUserDataFromToken = async (cookies: Cookies) => {
    const token = cookies.get('jwt_token');
    let user = null;
    const secret = process.env.JWT_SECRET;
    if (token && secret) {
        let decoded;
        try {
            decoded = verify(token, secret) as { id: string };
            user = await prisma.user.findFirstOrThrow({ where: { id: decoded.id }, select: { id: true, email: true, firstName: true, lastName: true, profileImage: true, address: true, phone: true } });

        } catch (error) {
            user = null;
        }
    }
    return user;
}

export const getUserIdFromToken = (cookies: Cookies) => {
    const token = cookies.get('jwt_token');
    let user = null;
    const secret = process.env.JWT_SECRET;
    if (token && secret) {
        try {
            user = verify(token, secret) as { id: string };


        } catch (error) {
            user = null;
        }
    }
    return user;
}