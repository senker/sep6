import {prisma} from "@/lib/prisma";
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: 'test@test.com'
            }
        });
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({error});
    }
}