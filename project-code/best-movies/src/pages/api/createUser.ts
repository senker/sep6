import {prisma} from "@/lib/prisma";
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const { email, password, name } = request.body;
        const user= await prisma.user.create({
            data: {
                email,
                password,
                name,
            },
        })
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({error});
    }
}