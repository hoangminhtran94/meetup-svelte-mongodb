import type { PageServerLoad, Actions } from './$types';
import type { User } from '@prisma/client';
import fs from "fs"
import path from "path"
import { v4 } from "uuid"
import { hashSync } from "bcrypt"
import { prisma } from '../../../prisma/database/+db.server';
import { fail } from '@sveltejs/kit';
export const prerender = false
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;
export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get("profile-image") as File | null
        let imagePath = "";
        if (file) {
            imagePath = `/upload/${v4()}.png`
            const bytes = await file.arrayBuffer()
            const buffers = Buffer.from(bytes);

            const savePath = path.join("static", imagePath)
            fs.writeFileSync(savePath, buffers);
        }

        const data = Object.fromEntries(formData) as User
        let user;
        try {
            user = await prisma.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profileImage: imagePath,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    password: hashSync(data.password, 8)

                }
            })
        } catch (error) {
            return fail(500, { message: "Something went wrong" })
        }
        return user

    }
} satisfies Actions